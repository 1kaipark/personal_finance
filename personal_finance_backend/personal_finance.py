"""
PersonalFinance class, define with person's name
attrib .data: a pandas DataFrame with entries, columns: ['date', 'category', 'title', 'amount', 'notes']
attrib .barchart: barchart in the form of a DataFrame, with the category, category sum ('amount'), and height (log scale of amount)

 ／l、
（ﾟ､ ｡ ７
  l  ~ヽ
  じしf_,)ノ
"""

import pandas as pd
from pandas import Period
from datetime import datetime as dt
import pytz
import numpy as np
import os
from typing import Any

class PersonalFinance:
    def __init__(self, user_name: str) -> None:
        # used for optimistic locking
        self.session_id = str(dt.now(pytz.timezone('America/Los_Angeles')))

        """initialize the class with the following attributes:
            * user_name -- the user's name, used to store information
            * data -- initialized as an empty dataframe, gets concatenated with new additions
            * cat_totals -- category totals """
        self.user_name = user_name
        # initialize dataframe with these columns
        self.data = pd.DataFrame(columns=['date', 'category', 'title', 'amount', 'notes', 'session_id'])
        # dataframe for totals is stored here. also includes month.
        self._cat_totals = None

    def new_entry(self, date: "DateLike", category: str, title: str, amount: float, notes: str = ' ') -> None:
        """add a row to self.data"""
        new_row = pd.DataFrame([{
            'date': date,
            'category': category,
            'title': title,
            'amount': amount,
            'notes': notes,
            'session_id': self.session_id
        }])
        self.data = pd.concat([self.data, new_row], ignore_index=True)

    @property
    def _data_month_incl(self) -> pd.DataFrame:
        """literally a copy of self.data with specific month column."""
        df = self.data.copy()
        df['date'] = pd.to_datetime(df['date'])
        df['month'] = df['date'].dt.to_period('M')
        df['month'] = df['month'].apply(lambda month: str(month))
        return df

    @property
    def cat_totals(self) -> pd.DataFrame | None:
        """big dataframe to store totals by category"""
        if not self._data_month_incl.empty:
            self._cat_totals = self._data_month_incl.groupby(['month', 'category']).sum(numeric_only=True)
        return self._cat_totals

    def monthly_cat_totals(self, month: str = 'ALL') -> dict[str, pd.DataFrame]:
        """filter self.cat_totals for a specified month"""
        months = list(set(self._data_month_incl['month']))
        if month == 'ALL':
            return self.cat_totals.reset_index().groupby('category').sum(numeric_only=True).reset_index()
        if month not in months:
            raise ValueError("Invalid Month: {}".format(month))
        else:
            return self.cat_totals.loc[month].reset_index()
        
    def filter_by_category(self, category: str = 'ALL') -> pd.DataFrame:
        return self.data[self.data['category'] == category]

    def delete_index(self, index: int) -> None:
        """remove an index from self.data"""
        if index in self.data.index:
            self.data = self.data.drop(index=index)
            self.data = self.data.reset_index(drop=True)[['date', 'category', 'title', 'amount', 'notes', 'session_id']]
        else:
            raise IndexError('Index not found')
        
    def resort_data(self) -> None:
        self.data = self.data.sort_values(by='date', ascending=False).fillna('').reset_index(drop=True)

    def edit_index(self, index: int, column: str, new_val: Any) -> None:
        """edit an expense by index"""
        ...

    def dump(self) -> None:
        """write self.data to csv file"""
        latest_written_session = pd.read_csv(f'personal_finance_{self.user_name}.csv')['session_id'].max()
        if self.session_id <= latest_written_session:
            # if this instance's session ID is less than the most recent session ID, do not write.
            raise Exception("Failed to write -- local copy is out of date. Please reload.")
        else:
            self.data.to_csv(f'personal_finance_{self.user_name}.csv', index=False)

    def load(self) -> None:
        """load a csv file"""
        assert os.path.exists(f'personal_finance_{self.user_name}.csv')
        read_df = pd.read_csv(f'personal_finance_{self.user_name}.csv')[['date', 'category', 'title', 'amount', 'notes', 'session_id']]
        read_df = read_df.sort_values(by='date', ascending=False)
        if not read_df.empty:
            self.data = read_df.fillna('').reset_index(drop=True)
        self.data['date'] = self.data['date'].apply(lambda date: date[:10])
        self.data['date'] = pd.to_datetime(self.data['date'])
        self.data['amount'] = self.data['amount'].apply(lambda amt: np.round(amt, 2))
        # update session name
        self._cat_totals = pd.DataFrame(columns=['category', 'amount'])

    def establish_new_session(self) -> None:
        # used for version lock
        self.session_id = str(dt.now(pytz.timezone('America/Los_Angeles')))
        self.data['session_id'] = self.session_id


