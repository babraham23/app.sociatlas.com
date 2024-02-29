Process of requesting a friend 

Sender - 6570f7f82394b47863ad4cfa
Receiver - 6570f8282394b47863ad4cfe


1. We send a friend request 
http://localhost:3000/api/friends/inviteUserAsFriend
{ 
    "senderUserId": "6570f7f82394b47863ad4cfa", 
    "receiverUserId": "6570f8282394b47863ad4cfe" 
}

2. User check if a user has any friend requests (This needs to be set at the route of the app)
http://localhost:3000/api/friends/getAllFriendRequests?receiverUserId=6570f8282394b47863ad4cfe


3. A user may respond to the request (may accept or decline)
http://localhost:3000/api/friends/respondToFriendRequest
{ 
    "senderUserId": "6570f7f82394b47863ad4cfa", 
    "receiverUserId": "6570f8282394b47863ad4cfe",
    "action": "accept"
}