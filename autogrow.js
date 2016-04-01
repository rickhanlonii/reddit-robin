// Source: https://www.reddit.com/r/joinrobin/comments/4cwk2s/automatic_grow_userscript_bot/d1lzfpu
// ==UserScript==
// @name         Robin Autovoter
// @namespace    http://jerl.im
// @version      1.0
// @description  Autovotes via text on /r/robin
// @author       /u/keythkatz
// @match        https://www.reddit.com/robin/
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';
setTimeout(function(){
    $("#robinSendMessage > input[type='text']").val("/vote grow");
    $("#robinSendMessage > input[type='submit']").click();
    $("#robinSendMessage > input[type='text']").val("Autovoted grow! https://www.reddit.com/r/joinrobin/comments/4cwk2s/automatic_grow_userscript_bot/d1lzfpu");
    $("#robinSendMessage > input[type='submit']").click();
}, 5000);
