# Reddit Robbin

[What we know so far](https://www.reddit.com/r/joinrobin/comments/4cw726/what_we_know_so_far/):

- Praise be to bird 🐦 ☝️

- The chat works in rounds. You have to vote on if you want to Abandon, Stay or Grow. Abandon means you have to start over. Grow means that your chat merges with another (possibly only of the same size?). Once you're in a chat, you stay in said chat until you abandon it. This means that you can switch devices and browsers. But, if you don't vote, you automatically abandon it when the timer runs out.

- Non-votes and abstentions will be counted as votes to abandon. [link](https://github.com/rickhanlonii/reddit-robin/pull/1/files#r58232264)  

- There's a growing number of know related subreddits:
  - /r/joinrobin
  - /r/joinrhino
  - /r/joinsquirrel
  - /r/joinduck
  - /r/joinweasel

- Each subreddit changes the message periodically. 

# Links
- https://www.reddit.com/r/joinrobin/comments/4cwkbg/there_are_other_related_subreddits_the_mystery/
- https://www.reddit.com/r/joinweasel
- https://www.reddit.com/r/joinrobin/comments/4cw726/what_we_know_so_far/
- 
# Autogrow
Go here for autogrow script: https://jsfiddle.net/gvh7tdtg/1/

Or select and drag this script to your bookmark bar:
```
javascript:(function()%7BsetTimeout(function()%20%7B%20%24('.robin-chat--vote-increase').click()%20%7D%2C%201000)%3B%20alert(%22You%20are%20now%20auto-growing.%22)%7D)()
```

# Commands
- `/me <message>`
- `/whois <user>`
- `/remind <seconds> <message>`
- `/leave_room`
- `/clear`
- `/vote <value>`

