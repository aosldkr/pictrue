let $gItemList = [];
let $gPagingNum = 1;

// 1번 방식
function getDataList() {
    // <!--  json 가져올때 fetch로 불러오기 -->
    fetch('./js/paintingsList.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            // json type 으로 변환
            return response.json();
        })
        .then(jsonDataList => {
            $gItemList = jsonDataList.data;

            // 페이징 1 페이지 기본 default
            paging(1);

            // 검색창 세팅
            makeSearh();

            // 페이징 영역 동적 생성
            makePagingHtml();

        })
        .catch(function () {

            console.log("예외처리");
        })
}

// 2번 방식 promise + fetch 를 이용한 json 임포트
function load(url) {
    return new Promise(async function (resolve, reject) {
        // do async thing
        const res = await fetch(url)
        // resolve
        resolve(res.json()) // see note below!
    })
}

// // paintingList 세팅
let $mainPaintingListEl = document.querySelector('.grid')

function makePaintingList(objs) {

    console.log(objs)
    let $makePaintingHtml = "";

    if (objs.length > 0) {
        objs.forEach((element, key) => {

            $makePaintingHtml += `<li data-value = "${element.id}" class="grid-item">
                        <a href="#">
                            <img src="${element.url}" alt="">
                        </a>
                        <h4>${element.title}</h4>
                        <span>${element.name}</span>
                    </li>`;

        });
    } else {
        $makePaintingHtml += '<li class="grid-item nonItem"> 결과 내역이 없습니다</li>';
    }
    $mainPaintingListEl.innerHTML = $makePaintingHtml;

    setTimeout(() => {
        // 로딩삭제
        let $li = document.querySelector('.grid-item')
        var msnry = new Masonry('.grid', {
            columnWidth: $li.offsetWidth,
            itemSelector: '.grid-item',
            gutter: $mainPaintingListEl.offsetWidth * 0.027
        });
        $mainPaintingListEl.classList.add('active');
    }, 500)
    // 로딩스타트

}

/**
 * 페이징 처리 함수
 * @param e {number} : 페이징 처리할 숫자
 */
function paging(e) {

    if (e === "+1") {
        $gPagingNum += 1;
    } else if (e === "-1") {
        $gPagingNum -= 1;
    } else {
        $gPagingNum = e;
    }

    // 페이징 숫자가 0보다 작아진다면 1페이지 고정으로
    if ($gPagingNum <= 0) {
        $gPagingNum = 1;
    }

    event ? event.preventDefault() : '';
    $mainPaintingListEl.classList.remove('active');
    let elpageNumber = $gPagingNum;
    let elStartPageNum = (18 * (parseInt(elpageNumber) - 1));
    let elLimitPageNum = 18 * parseInt(elpageNumber);
    let elPagingDataList = [];

    $gItemList.map((element, index) => {
        if (elStartPageNum - 1 < index && elLimitPageNum > index) {
            elPagingDataList.push(element)
        }
    })
    makePaintingList(elPagingDataList);

    // 팝업창
    let elPopupBox = document.querySelector(".paintings-Popup1");
    const elGrid = document.querySelectorAll('.grid > .grid-item');

    elGrid.forEach((el, k) => {

        el.onclick = (elObj) => {

            // 결과 내역이 없을 경우 click 이벤트는 발생하면 안됨
            if (elObj.currentTarget.innerHTML.replace(" ", "") != "결과 내역이 없습니다") {
                event.preventDefault();
                elPopupBox.classList.add('active3');

                let $popHtml = "";
                $gItemList.map((element, index) => {

                    let objtureIndex = elObj.currentTarget.getAttribute(
                        "data-value");
                    if (objtureIndex == element.id) {

                        $popHtml += makePopupHtml(element);

                        elPopupBox.innerHTML = $popHtml;

                        const elPopupClose = document.querySelector(
                            '.Popup-logo-close1');
                        elPopupClose.onclick = function () {
                            elPopupBox.classList.remove('active3')
                        }
                    }
                })
            }
        }
    })

    // 페이징에 따른 숫자 동적 변화
    let $pageNumberEl = document.querySelectorAll("#pagingArea > a");
    $pageNumberEl.forEach((numberEl, numberIndex) => {

        // 현재 클릭한 요소의 스타일 변경
        if (Number(numberEl.textContent) === $gPagingNum) {
            numberEl.style.fontSize = "40px";
        } else {
            numberEl.style.fontSize = "20px";
        }

    })

    window.scrollTo(0, 1000);

}

/**
 * 검색 기능 함수 ( 결과값 alert ) - enter event
 */
function searchEnter() {

    if (window.event.keyCode == 13) {
        // 엔터키가 눌렸을 때

        // 팝업창
        let $elPopupBox = document.querySelector(".paintings-Popup1");
        let $searchItem = document.querySelector(
            "body > main > div.paintingsMainImg > div > input[type=text]").value;

        $elPopupBox.classList.add('active3');

        let $popHtml = "";
        $gItemList.map((element) => {

            if (element.title === $searchItem) {

                $popHtml += makePopupHtml(element);

                $elPopupBox.innerHTML = $popHtml;

                const elPopupClose = document.querySelector(
                    '.Popup-logo-close1');
                elPopupClose.onclick = function () {
                    $elPopupBox.classList.remove('active3')
                }
            }
        })

    }
}

/**
 * 검색 기능 함수 ( 결과값 alert ) - click event
 */
function searchClick() {

    // 팝업창
    let $elPopupBox = document.querySelector(".paintings-Popup1");
    let $searchItem = document.querySelector(
        "body > main > div.paintingsMainImg > div > input[type=text]").value;

    if ($searchItem === '') {
        alert("검색어를 입력해 주세요.")
        return false;
    }

    $elPopupBox.classList.add('active3');

    let $popHtml = "";
    $gItemList.map((element) => {

        if (element.title === $searchItem) {

            $popHtml += makePopupHtml(element);

            $elPopupBox.innerHTML = $popHtml;

            const elPopupClose = document.querySelector(
                '.Popup-logo-close1');
            elPopupClose.onclick = function () {
                $elPopupBox.classList.remove('active3')
            }
        }
    })

}

/**
 * 페이징 영역 생성 함수
 */
function makePagingHtml() {
    let $pagingAreaEl = document.getElementById("pagingArea");
    let $pageNumShare = Math.floor($gItemList.length / 18);
    let $pageRound = $gItemList.length % 18 >= 1 ? 1 : 0;
    let $pagSumCnt = $pageNumShare + $pageRound;
    let $makeHtmlPagingAreaEl = "";

    $makeHtmlPagingAreaEl += "<a href=\"\" id=\"prev_page\" onClick=\"paging('-1');\"> < </a>";

    for (let $cnt = 0; $cnt < $pagSumCnt; $cnt++) {
        // 첫 페이지 ( 1 ) 고정
        if ($cnt === 0) {
            $makeHtmlPagingAreaEl += "<a style='font-size: 40px;' href=\"\" onClick=\"paging("
                + ($cnt + 1) + ");\">" + ($cnt + 1) + "</a>";
        } else {
            $makeHtmlPagingAreaEl += "<a href=\"\" onClick=\"paging(" + ($cnt
                + 1) + ");\">" + ($cnt + 1) + "</a>";
        }
    }

    $makeHtmlPagingAreaEl += "<a href=\"\" id=\"next_page\" onClick=\"paging('+1');\"> > </a>";

    $pagingAreaEl.innerHTML = $makeHtmlPagingAreaEl;

}

/**
 * 팝업 생성 함수
 * @param element {object} : 명화 객체
 */
function makePopupHtml(element) {

    let $popHtml = "";

    $popHtml += '<div class="paintings-Popup1-1">';

    $popHtml += '<div class="Popup-logo1">';
    $popHtml += '<h3 class="Popup-logo-title1">Painting Art List</h3>';
    $popHtml += '<img class="Popup-logo-close1" src="./img/icon/close.svg">';
    $popHtml += '</div>';

    $popHtml += '<ul class="Popupimg1">';
    $popHtml += '<li>';
    $popHtml += '<figure>';
    $popHtml += '<img src= ' + element.url + ' alt="">';
    $popHtml += '</figure>';

    $popHtml += '<div class="Popupimg1-text">';
    $popHtml += '<h4>' + element.title + '</h4>';
    $popHtml += '<span>' + element.name + '</span>';
    $popHtml += '<p>' + element.text + '</p>';
    $popHtml += '</div>';
    $popHtml += '</li>';
    $popHtml += '</ul>';

    $popHtml += '</div>';

    return $popHtml;
}

/**
 * 검색 기능 세팅
 */
function makeSearh() {

    let $searchInputEl = document.getElementById("searchInput");
    let $makeHtmlSearchEls = "";

    $gItemList.map(item => {
        $makeHtmlSearchEls += `<option value="${item.title}">`;
    })

    $searchInputEl.innerHTML = $makeHtmlSearchEls;

}

window.onload = getDataList;
