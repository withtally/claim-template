export default [
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'version',
        type: 'string',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
    ],
    name: 'AddressEmptyCode',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'AddressInsufficientBalance',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ECDSAInvalidSignature',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'length',
        type: 'uint256',
      },
    ],
    name: 'ECDSAInvalidSignatureLength',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 's',
        type: 'bytes32',
      },
    ],
    name: 'ECDSAInvalidSignatureS',
    type: 'error',
  },
  {
    inputs: [],
    name: 'FailedInnerCall',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'currentNonce',
        type: 'uint256',
      },
    ],
    name: 'InvalidAccountNonce',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidShortString',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ReentrancyGuardReentrantCall',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'SafeERC20FailedOperation',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'str',
        type: 'string',
      },
    ],
    name: 'StringTooLong',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes16',
        name: 'id',
        type: 'bytes16',
      },
    ],
    name: 'CampaignCancelled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes16',
        name: 'id',
        type: 'bytes16',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'manager',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'start',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'end',
            type: 'uint256',
          },
          {
            internalType: 'enum DelegatedClaimCampaigns.TokenLockup',
            name: 'tokenLockup',
            type: 'uint8',
          },
          {
            internalType: 'bytes32',
            name: 'root',
            type: 'bytes32',
          },
          {
            internalType: 'bool',
            name: 'delegating',
            type: 'bool',
          },
        ],
        indexed: false,
        internalType: 'struct DelegatedClaimCampaigns.Campaign',
        name: 'campaign',
        type: 'tuple',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'totalClaimers',
        type: 'uint256',
      },
    ],
    name: 'CampaignStarted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes16',
        name: 'id',
        type: 'bytes16',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'tokenLocker',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'start',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'cliff',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'period',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'periods',
            type: 'uint256',
          },
        ],
        indexed: false,
        internalType: 'struct DelegatedClaimCampaigns.ClaimLockup',
        name: 'claimLockup',
        type: 'tuple',
      },
    ],
    name: 'ClaimLockupCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Claimed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'EIP712DomainChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes16',
        name: 'id',
        type: 'bytes16',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'claimer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountClaimed',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountRemaining',
        type: 'uint256',
      },
    ],
    name: 'LockedTokensClaimed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes16',
        name: 'id',
        type: 'bytes16',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'claimer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountClaimed',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountRemaining',
        type: 'uint256',
      },
    ],
    name: 'UnlockedTokensClaimed',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'bytes16',
        name: '',
        type: 'bytes16',
      },
    ],
    name: 'campaigns',
    outputs: [
      {
        internalType: 'address',
        name: 'manager',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'end',
        type: 'uint256',
      },
      {
        internalType: 'enum DelegatedClaimCampaigns.TokenLockup',
        name: 'tokenLockup',
        type: 'uint8',
      },
      {
        internalType: 'bytes32',
        name: 'root',
        type: 'bytes32',
      },
      {
        internalType: 'bool',
        name: 'delegating',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes16',
        name: 'campaignId',
        type: 'bytes16',
      },
    ],
    name: 'cancelCampaign',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes16',
        name: 'campaignId',
        type: 'bytes16',
      },
      {
        internalType: 'bytes32[]',
        name: 'proof',
        type: 'bytes32[]',
      },
      {
        internalType: 'uint256',
        name: 'claimAmount',
        type: 'uint256',
      },
    ],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes16',
        name: 'campaignId',
        type: 'bytes16',
      },
      {
        internalType: 'bytes32[]',
        name: 'proof',
        type: 'bytes32[]',
      },
      {
        internalType: 'uint256',
        name: 'claimAmount',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'delegatee',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expiry',
            type: 'uint256',
          },
          {
            internalType: 'uint8',
            name: 'v',
            type: 'uint8',
          },
          {
            internalType: 'bytes32',
            name: 'r',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 's',
            type: 'bytes32',
          },
        ],
        internalType: 'struct DelegatedClaimCampaigns.SignatureParams',
        name: 'delegationSignature',
        type: 'tuple',
      },
    ],
    name: 'claimAndDelegate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes16',
        name: 'campaignId',
        type: 'bytes16',
      },
      {
        internalType: 'bytes32[]',
        name: 'proof',
        type: 'bytes32[]',
      },
      {
        internalType: 'address',
        name: 'claimer',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'claimAmount',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expiry',
            type: 'uint256',
          },
          {
            internalType: 'uint8',
            name: 'v',
            type: 'uint8',
          },
          {
            internalType: 'bytes32',
            name: 'r',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 's',
            type: 'bytes32',
          },
        ],
        internalType: 'struct DelegatedClaimCampaigns.SignatureParams',
        name: 'claimSignature',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: 'delegatee',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expiry',
            type: 'uint256',
          },
          {
            internalType: 'uint8',
            name: 'v',
            type: 'uint8',
          },
          {
            internalType: 'bytes32',
            name: 'r',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 's',
            type: 'bytes32',
          },
        ],
        internalType: 'struct DelegatedClaimCampaigns.SignatureParams',
        name: 'delegationSignature',
        type: 'tuple',
      },
    ],
    name: 'claimAndDelegateWithSig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes16',
        name: '',
        type: 'bytes16',
      },
    ],
    name: 'claimLockups',
    outputs: [
      {
        internalType: 'address',
        name: 'tokenLocker',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'cliff',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'period',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'periods',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes16[]',
        name: 'campaignIds',
        type: 'bytes16[]',
      },
      {
        internalType: 'bytes32[][]',
        name: 'proofs',
        type: 'bytes32[][]',
      },
      {
        internalType: 'uint256[]',
        name: 'claimAmounts',
        type: 'uint256[]',
      },
    ],
    name: 'claimMultiple',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes16',
        name: 'campaignId',
        type: 'bytes16',
      },
      {
        internalType: 'bytes32[]',
        name: 'proof',
        type: 'bytes32[]',
      },
      {
        internalType: 'address',
        name: 'claimer',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'claimAmount',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expiry',
            type: 'uint256',
          },
          {
            internalType: 'uint8',
            name: 'v',
            type: 'uint8',
          },
          {
            internalType: 'bytes32',
            name: 'r',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 's',
            type: 'bytes32',
          },
        ],
        internalType: 'struct DelegatedClaimCampaigns.SignatureParams',
        name: 'claimSignature',
        type: 'tuple',
      },
    ],
    name: 'claimWithSig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes16',
        name: '',
        type: 'bytes16',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'claimed',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes16',
        name: 'id',
        type: 'bytes16',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'manager',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'start',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'end',
            type: 'uint256',
          },
          {
            internalType: 'enum DelegatedClaimCampaigns.TokenLockup',
            name: 'tokenLockup',
            type: 'uint8',
          },
          {
            internalType: 'bytes32',
            name: 'root',
            type: 'bytes32',
          },
          {
            internalType: 'bool',
            name: 'delegating',
            type: 'bool',
          },
        ],
        internalType: 'struct DelegatedClaimCampaigns.Campaign',
        name: 'campaign',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'tokenLocker',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'start',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'cliff',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'period',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'periods',
            type: 'uint256',
          },
        ],
        internalType: 'struct DelegatedClaimCampaigns.ClaimLockup',
        name: 'claimLockup',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: 'vestingAdmin',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'totalClaimers',
        type: 'uint256',
      },
    ],
    name: 'createLockedCampaign',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes16',
        name: 'id',
        type: 'bytes16',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'manager',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'start',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'end',
            type: 'uint256',
          },
          {
            internalType: 'enum DelegatedClaimCampaigns.TokenLockup',
            name: 'tokenLockup',
            type: 'uint8',
          },
          {
            internalType: 'bytes32',
            name: 'root',
            type: 'bytes32',
          },
          {
            internalType: 'bool',
            name: 'delegating',
            type: 'bool',
          },
        ],
        internalType: 'struct DelegatedClaimCampaigns.Campaign',
        name: 'campaign',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: 'totalClaimers',
        type: 'uint256',
      },
    ],
    name: 'createUnlockedCampaign',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'eip712Domain',
    outputs: [
      {
        internalType: 'bytes1',
        name: 'fields',
        type: 'bytes1',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'version',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'verifyingContract',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'salt',
        type: 'bytes32',
      },
      {
        internalType: 'uint256[]',
        name: 'extensions',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'nonces',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'onERC721Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes16',
        name: '',
        type: 'bytes16',
      },
    ],
    name: 'usedIds',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'root',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32[]',
        name: 'proof',
        type: 'bytes32[]',
      },
      {
        internalType: 'address',
        name: 'claimer',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'verify',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
] as const;
