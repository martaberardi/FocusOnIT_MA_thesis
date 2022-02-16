export const schema = {
    "models": {
        "AnalyticsData": {
            "name": "AnalyticsData",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "event": {
                    "name": "event",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "attributes": {
                    "name": "attributes",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": []
                },
                "userID": {
                    "name": "userID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "AnalyticsData",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byUser",
                        "fields": [
                            "userID"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "User": {
            "name": "User",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "Stats": {
                    "name": "Stats",
                    "isArray": true,
                    "type": {
                        "model": "Stats"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "userID"
                    }
                },
                "cognitoId": {
                    "name": "cognitoId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "AnalyticsData": {
                    "name": "AnalyticsData",
                    "isArray": true,
                    "type": {
                        "model": "AnalyticsData"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "userID"
                    }
                },
                "userPageViews": {
                    "name": "userPageViews",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Users",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "admin"
                                ],
                                "operations": [
                                    "read",
                                    "create",
                                    "update",
                                    "delete"
                                ]
                            },
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "operations": [
                                    "create",
                                    "read",
                                    "update"
                                ],
                                "identityClaim": "cognito:username"
                            }
                        ]
                    }
                }
            ]
        },
        "Stats": {
            "name": "Stats",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "userID": {
                    "name": "userID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "pos": {
                    "name": "pos",
                    "isArray": false,
                    "type": {
                        "enum": "PartOfSpeech"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "dialogId": {
                    "name": "dialogId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "wordsStats": {
                    "name": "wordsStats",
                    "isArray": true,
                    "type": {
                        "nonModel": "WordStats"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "savedAt": {
                    "name": "savedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Stats",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byUser",
                        "fields": [
                            "userID"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "operations": [
                                    "create",
                                    "read",
                                    "update"
                                ],
                                "identityClaim": "cognito:username"
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "admin"
                                ],
                                "operations": [
                                    "read",
                                    "create",
                                    "update",
                                    "delete"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Dialog": {
            "name": "Dialog",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "phrases": {
                    "name": "phrases",
                    "isArray": true,
                    "type": {
                        "nonModel": "Phrase"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "videoUrl": {
                    "name": "videoUrl",
                    "isArray": false,
                    "type": "AWSURL",
                    "isRequired": true,
                    "attributes": []
                },
                "title": {
                    "name": "title",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "topic": {
                    "name": "topic",
                    "isArray": false,
                    "type": {
                        "enum": "Topic"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Dialogs",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "admin"
                                ],
                                "operations": [
                                    "read",
                                    "create",
                                    "update",
                                    "delete"
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    },
    "enums": {
        "PartOfSpeech": {
            "name": "PartOfSpeech",
            "values": [
                "VERB",
                "NOUN",
                "ARTICLE",
                "ADJECTIVE",
                "PREPOSITION_ARTICLE"
            ]
        },
        "Gender": {
            "name": "Gender",
            "values": [
                "MALE",
                "FEMALE"
            ]
        },
        "Person": {
            "name": "Person",
            "values": [
                "FIRST",
                "SECOND",
                "THIRD"
            ]
        },
        "WordNumber": {
            "name": "WordNumber",
            "values": [
                "SINGULAR",
                "PLURAL"
            ]
        },
        "PhraseStatus": {
            "name": "PhraseStatus",
            "values": [
                "TO_COMPLETE",
                "COMPLETED",
                "UNNECESSARY"
            ]
        },
        "Topic": {
            "name": "Topic",
            "values": [
                "CIBO",
                "MEZZI",
                "LAVORO",
                "APPUNTAMENTO",
                "INFORMAZIONI_PERSONALI",
                "DOTTORE",
                "SPESA",
                "DESCRIZIONE_FISICA",
                "EMOZIONI_E_SALUTE",
                "MERCATO",
                "TEMPO_LIBERO"
            ]
        }
    },
    "nonModels": {
        "ButtonClick": {
            "name": "ButtonClick",
            "fields": {
                "isoDateTime": {
                    "name": "isoDateTime",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": true,
                    "attributes": []
                },
                "userInput": {
                    "name": "userInput",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            }
        },
        "WordStats": {
            "name": "WordStats",
            "fields": {
                "firstHintShowed": {
                    "name": "firstHintShowed",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                },
                "secondHintShowed": {
                    "name": "secondHintShowed",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                },
                "answerShowed": {
                    "name": "answerShowed",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                },
                "word": {
                    "name": "word",
                    "isArray": false,
                    "type": {
                        "nonModel": "Word"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "buttonClicks": {
                    "name": "buttonClicks",
                    "isArray": true,
                    "type": {
                        "nonModel": "ButtonClick"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "wordId": {
                    "name": "wordId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "phraseId": {
                    "name": "phraseId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            }
        },
        "Word": {
            "name": "Word",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "position": {
                    "name": "position",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "lemma": {
                    "name": "lemma",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "part_of_speech": {
                    "name": "part_of_speech",
                    "isArray": false,
                    "type": {
                        "enum": "PartOfSpeech"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "part_of_speech2": {
                    "name": "part_of_speech2",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "head": {
                    "name": "head",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "dependency_relation": {
                    "name": "dependency_relation",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "features": {
                    "name": "features",
                    "isArray": false,
                    "type": {
                        "nonModel": "WordFeatures"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "form": {
                    "name": "form",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "inflection": {
                    "name": "inflection",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "WordFeatures": {
            "name": "WordFeatures",
            "fields": {
                "gender": {
                    "name": "gender",
                    "isArray": false,
                    "type": {
                        "enum": "Gender"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "person": {
                    "name": "person",
                    "isArray": false,
                    "type": {
                        "enum": "Person"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "mode": {
                    "name": "mode",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "tense": {
                    "name": "tense",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "number": {
                    "name": "number",
                    "isArray": false,
                    "type": {
                        "enum": "WordNumber"
                    },
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "Speaker": {
            "name": "Speaker",
            "fields": {
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "gender": {
                    "name": "gender",
                    "isArray": false,
                    "type": {
                        "enum": "Gender"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "number": {
                    "name": "number",
                    "isArray": false,
                    "type": {
                        "enum": "WordNumber"
                    },
                    "isRequired": true,
                    "attributes": []
                }
            }
        },
        "Phrase": {
            "name": "Phrase",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "words": {
                    "name": "words",
                    "isArray": true,
                    "type": {
                        "nonModel": "Word"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "speaker": {
                    "name": "speaker",
                    "isArray": false,
                    "type": {
                        "nonModel": "Speaker"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "status": {
                    "name": "status",
                    "isArray": false,
                    "type": {
                        "enum": "PhraseStatus"
                    },
                    "isRequired": false,
                    "attributes": []
                }
            }
        }
    },
    "version": "02458273861d10a0517339bf42c3a88a"
};