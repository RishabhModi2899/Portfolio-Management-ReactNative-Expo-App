# imports
import pandas as pd

# dictionary to store symbol and name of the company 
investment_instruments_dict = {}
temp_dir = {}
list_Investments_Instruments = []

# Final dictionary for stocks and mf and etf used for mapping
df1 = pd.read_csv("Backend\PythonFiles & stock name list\EQUITY_L.csv",
                usecols=['SYMBOL', 'NAME OF COMPANY'])
df2 = pd.read_csv("Backend\PythonFiles & stock name list\mf_close-end.csv",
                usecols=['SYMBOL', 'NAME OF COMPANY'])
df3 = pd.read_csv("Backend\PythonFiles & stock name list\eq_etfseclist.csv",
                usecols=['Symbol'])

investment_instruments_dict = df1.set_index('SYMBOL').T.to_dict('list')
temp_dir = df2.set_index('SYMBOL').T.to_dict('list')
investment_instruments_dict.update(temp_dir)
temp_dir = df3.to_dict('list')
investment_instruments_dict.update(temp_dir)