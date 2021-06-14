# imports
import pandas as pd
import json

# dictionary to store symbol and name of the company 
investment_instruments = {}
temp_dir = {}
list_Investments_Instruments = []

# reading the csv file and storing the details in the dictionary 
df1 = pd.read_csv("C:/Users/rishabh_2/Desktop/Projects/React Projects/PM_APP/PythonFiles & stock name list/EQUITY_L.csv" , 
                usecols=['SYMBOL', 'NAME OF COMPANY'])
df2 = pd.read_csv("C:/Users/rishabh_2/Desktop/Projects/React Projects/PM_APP/PythonFiles & stock name list/mf_close-end.csv",
                usecols=['SYMBOL', 'NAME OF COMPANY'])
df3 = pd.read_csv("C:/Users/rishabh_2/Desktop/Projects/React Projects/PM_APP/PythonFiles & stock name list/eq_etfseclist.csv",
                usecols=['Symbol' , 'Security Name'])

investment_instruments = df1.set_index('SYMBOL').T.to_dict('list')
temp_dir = df2.set_index('SYMBOL').T.to_dict('list')
investment_instruments.update(temp_dir)
temp_dir = df3.set_index('Symbol').T.to_dict('list')
investment_instruments.update(temp_dir)

# converting the List to JSON object
for i in investment_instruments.keys():
    list_Investments_Instruments.append(investment_instruments[i])

JSON_List_Investments_Instruments = json.dumps(list_Investments_Instruments)

# writting the JSON File in a text file
with open('C:/Users/rishabh_2/Desktop/Projects/React Projects/PM_APP/PythonFiles & stock name list/stocks_etf_mf.txt', 'w') as writeFile:
    writeFile.write(JSON_List_Investments_Instruments)
