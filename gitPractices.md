# Git practises for the group

This text will cover the convential git rules the group will follow thorughout the course. The purpose is to make it easier to view what the other group members are working on and be able to contribute in different tasks. The text will cover the choice of labels, how we are going to practice merge requests and how the format of the issues, branches and commits are set to be.

## Labels
The labels we are going to use during the course are the following ones:

- bug
- documentation
- feature
- refactor
- style
- testing

The labels are going to be included in the varoius issues. The puprose are to clearify for other viwers what the particular issue is all about. 

## Merge requests
Merge requestes is practised by another group member are given the task to merge the particular branch. The reason behind this is to ensure the quality of the code and increase the ability to detect possible bugs. Another important factor is that going through other people's code is good learning in itself. 


## Issues
The project will develop in accordance with issues. Each issue must contain a piece of code or documentation that is being developed. In addition, the issue must be assigned to the person who will solve the issue and must contain some labels that descripe it. In that way group members have ability to keep track of what the others are doing at the moment. The issue will also be assigned a generated number who will be used for branches and commits.  


## Branches
When an issue is to be done we have to create a branch. The branch name consists of an id accordring to the issue and a short description. Here is a example of a branch name:
``` 
21-save-the-world
```
Even the the branch name could be long, it is most important that it has an id for the issue first. This allows us to easily and quickly find out which branch belongs to which issue.


## Commits
When we want to push a branch to the repository we have to commit it. That is done by writing a commit message that communicates the nature of changes done. The commit message consists of three parts; a type, the id accoring to the issue and a description of what has been done. Here is on a commit message accroding to the brance name above: 
``` 
feat(#21): developed the solution to save the world
```
The type is one of the six labels listed above with an abbreviation. It is also important to include the id to confirm that the commit belong to the particular branch. Note that a commit message only can contain one label type, while an issue can contain more labels. 