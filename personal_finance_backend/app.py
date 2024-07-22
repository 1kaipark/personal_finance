from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime as dt 
import pandas as pd 
import numpy as np 
import os

from personal_finance import PersonalFinance

app = Flask(__name__)
# CORS(app)

# Initialize PersonalFinance with a test user
finance = PersonalFinance(user_name="kai")
finance.load()

@app.route('/api/user_name', methods=['GET'])
def user_name():
    return jsonify(finance.user_name)

# get all expenses 
@app.route('/api/get_all_expenses', methods=['GET'])
def get_all_expenses():
    global finance
    data = finance.data
    # convert dates to string format
    data['date'] = data['date'].apply(lambda date: str(date)[:10])
    return data.to_json(orient='index')

# expense by category
@app.route('/api/expenses_by_category', methods=['GET'])
def expenses_by_category():
    category = request.args.get('category')
    try:
        cat = finance.filter_by_category(category)
        return cat.to_json(orient='index')
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
# Fetch monthly totals for a specified month
@app.route('/api/get_monthly_totals', methods=['GET'])
def get_monthly_totals():
    month = request.args.get('month')
    try:
        totals = finance.monthly_cat_totals(month)
        return totals.to_json(orient='records')
    except ValueError as e:
        return jsonify({'error': str(e)}), 400

# Fetch monthly totals in percent format for bar chart purposes
@app.route('/api/get_monthly_heights', methods=['GET'])
def get_monthly_heights():
    month = request.args.get('month')
    try:
        totals_df = finance.monthly_cat_totals(month)
        totals_df['amount'] = totals_df['amount'] / max(totals_df['amount'])
        return totals_df.to_json(orient='records')
    except ValueError as e:
        return jsonify({'error': str(e)}), 400

# Numerical monthly sum
@app.route('/api/get_monthly_sum', methods=['GET'])
def get_monthly_sum():
    month = request.args.get('month')
    try:
        monthly_sum = finance.monthly_cat_totals(month)['amount'].sum()
        return jsonify({'sum': '{:,.2f}'.format(monthly_sum)})
    except ValueError as e:
        return jsonify({'error': str(e)}), 400

# List of months used internally
@app.route('/api/months_list', methods=['GET'])
def months_list():
    try:
        months = ['ALL'] + sorted(set(finance._data_month_incl['month']))[::-1]
        return jsonify(months)
    except Exception as e:
        return jsonify({'error': str(e)})

# Route to add an expense 
@app.route('/api/add_expense', methods=['POST'])
def add_expense():
    data = request.get_json()
    date = data.get('date')
    category = data.get('category')
    title = data.get('title')
    amount = data.get('amount')
    notes = data.get('notes', '')

    if not all([date, category, title, amount]):
        return jsonify({'error': 'missing required information'}), 400
    
    try:
        finance.new_entry(date=date, category=category, title=title, amount=amount, notes=notes)
        finance.dump()
        return jsonify({'message': 'expense add success'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Delete an expense entry by index
@app.route('/api/delete_expense', methods=['POST'])
def delete_expense():
    index = request.args.get('index')
    try:
        finance.delete_index(index=int(index))
        finance.dump()
        return jsonify({'message': 'expense delete success'}), 201
    except IndexError as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/refresh_data', methods=['POST'])
def refresh_data():
    global finance
    finance = PersonalFinance(user_name="kai")
    finance.load()
    data = finance.data
    data['date'] = data['date'].apply(lambda date: str(date)[:10])
    return data.to_json(orient='records')

@app.route('/api/establish_session', methods=['POST'])
def establish_session():
    try:
        finance.establish_new_session()
        return jsonify(
            {'success': f'new session established: {finance.session_id}'}
        )
    except Exception as e:
        return jsonify(
            {
                'error': f'failed to establish session {str(e)}'
            }
        )
    

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

if __name__ == "__main__":
    app.run(debug=True)
