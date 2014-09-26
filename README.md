Chouchian (抽籤)
================

A Lottery based on `Javascript` / `Google Spreadsheet`


Features
========

- use published google spreadsheet as data source
- supports multiple lists

Usage
=====

1. edit content in google spreadsheet (Note: must keep the __first column empty__!)

	<space>  | List A     | List B
	-------- | ---------  | ---------
	<space>  | element 1  | element 1  
	<space>  | element 2  | element 2
	<space>  | element 3  | <space>

2. publish the spreadsheet by click **File** > **Publish to the Web**

3. copy the link and paste to the filed `Source` and type the list name in `List`

4. after click `change`, the url will looks like 

	```
	http://nlpweb.github.io/chouchian/#spread=1ShT62S65ypu_9D9OFBd6_ImWBpngi-y_iK0wYmw4YLU&sheet=sinica
	```


Local Dev
=========

- run server: `python server -d -p 5000`

- access: `http://localhost:5000/`
 
