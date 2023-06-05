# Setup
from web3 import Web3

alchemy_url = "https://eth-mainnet.g.alchemy.com/v2/mcY7yrYbg7a86fvkarvhuFBN1ITXLfy0"
w3 = Web3(Web3.HTTPProvider(alchemy_url))

# Print if web3 is successfully connected
#print(w3.isConnected())
print(w3.is_connected)

# Get the latest block number
latest_block = w3.eth.get_block("latest")
print(latest_block)
