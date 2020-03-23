// ==UserScript==
// @name         AtCoderLabelChanger
// @version      1.0
// @description  提出結果をまとめるスクリプト．ついでに色も変えます．
// @author       y-oksaku
// @namespace    https://github.com/y-oksaku/AtCoderLabelChanger
// @match        https://atcoder.jp/contests/*/submissions/*
// @grant        none
// @license      CC0-1.0
// ==/UserScript==

(function(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//code.jquery.com/jquery-3.3.1.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")(jQuery.noConflict(true));";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
})(function ($) {
    let ac = 0;
    let wa = 0;
    let tle = 0;
    let other = 0;

    $('table > tbody > tr > td:not(#judge-status) > span.label').each(function () {
        const result = $(this).text();
        $(this).removeClass('label-success');
        $(this).removeClass('label-warning');

        switch (result) {
            case 'AC':
                $(this).addClass('label-success');
                ac++;
                break;
            case 'WA':
                $(this).addClass('label-danger');
                wa++;
                break;
            case 'TLE':
                $(this).addClass('label-warning');
                tle++;
                break;
            case 'CE':
            case 'RE':
            default:
                $(this).addClass('label-warning');
                other++;
                break;
        }
    });

    let html = '';
    if(ac > 0) html += `<span class="label label-success">AC</span> ${ac}&emsp;`;
    if(wa > 0) html += `<span class="label label-danger">WA</span> ${wa}&emsp;`;
    if(tle > 0) html += `<span class="label label-warning">TLE</span> ${tle}&emsp;`;
    if(other > 0) html += `<span class="label label-warning">other</span> ${other}&emsp;`;

    if(html != '') $('#judge-status').html(html);
});