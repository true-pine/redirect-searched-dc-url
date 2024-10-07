// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

function parseUrl(url) {
    // URL에서 board 부분을 기준으로 문자열 분리
    const boardPart = url.split('/board/')[1].split('?')[0]; // 쿼리 스트링 제거
    // boardPart에서 그룹을 추출
    const [group1, group2] = boardPart.split('/');
    
    // 원하는 형식으로 URL 생성
    const newUrl = `https://gall.dcinside.com/board/view/?id=${group1}&no=${group2}`;
    return newUrl;
}

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((e) => {
    const msg = `Navigation blocked to ${e.request.url} on tab ${e.request.tabId}.`;
    console.log(msg);

    chrome.storage.local.get(['isActive'], (result) => {
        console.log(result.isActive);
        if(result.isActive) {
            chrome.tabs.update(e.request.tabId, { url: parseUrl(e.request.url) });
        }
    });
});

console.log('Service worker started.');
