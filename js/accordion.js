const accordionData = [
    {
      title: "사진 고르는 것도 시간제한 있나요?",
      content: ["없습니다. 다만 촬영동의서는 세션이 1시간이 지나면 만료되어 리셋됩니다. 그 전까지 골라주시는 게 좋습니다."]
    },
    {
      title: "외부에서 찍은 사진들도 인화해주시나요?",
      content: ["불가능합니다. <br> 매장 내 촬영본만 인화해드리고 있습니다. 다만 증명사진에 한해 외부 촬영 사진을 인화해드리고 있습니다. (10,000원) <br> +) 가끔 영정사진 인화 문의가 오는데, B4 인화가 불가능하기 때문에 지하상가 사진관으로 안내해주세요."]
    },
    {
      title: "하트 누른 사진만 볼 수 있나요?",
      content: ["마우스 우클릭 – 정렬기준 – 자세히 – 등급 – 확인 – 마우스 우클릭 – 정렬기준 – 내림차순 <br> 하트 누른 사진이 위로 정렬됩니다."]
    },
    {
      title: "1명인데 기본셀프촬영 가능한가요?",
      content: ["가능합니다. <br> 그러나 A,B컷이 같은 사진으로 2장씩 나오는 구성이기 때문에 추천드리지는 않습니다. A,B컷 각각 1장 + 두컷사진 1장 + 전체원본파일 제공해드리는 홀로이즘패키지를 추천해주세요!"]
    },
    {
      title: "예약했는데 취소 및 환불 가능한가요?",
      content: ["이용 6일 전까지 말씀해주셔야 환불이 가능합니다. 날짜 및 촬영시간 변경해드리는 쪽으로 안내해주세요!"]
    },
    {
      title: "리터치 신청했는데 언제 찾으러 가면 될까요?",
      content: ["인화요청 눌러주신 다음 날 방문수령해주시면 됩니다."]
    },
    {
      title: "리터치 신청했는데 요구사항 적는 칸은 없나요?",
      content: ["1차 리터치는 본사에 리터치팀분들께서 임의로 보정해주시고, 1차 보정본이 마음에 안 드시거나 추가적인 요구사항이 있을 때 재수정요청을 통해 요구사항을 적어주시면 됩니다."]
    },
    {
      title: "증명사진 인화시간 얼마나 걸리나요?",
      content: ["평일 1~2시간, 주말 2~3시간 소요된다 안내해주시면 됩니다. <br> 평일은 17시, 주말은 16시 30분에 증명사진 인화요청이 마감됩니다. 이후의 신청서는 당시 본사와 작업자의 상황에 따라 당일인화가 가능할 수도, 불가능할 수도 있습니다. 인화가 완료되면 동의서에 기재해주신 번호로 꼭 문자드리고, 메일로도 수정본 파일 보내주세요! 긴급 건의 경우 리터치팀분들게 사전에 가능한지 여쭤본 뒤 진행해주세요."]
    },
    {
      title: "탈의실 있나요?",
      content: ["따로 구비되어 있는 탈의실은 없으나 2층으로 올라가서 갈아입으셔도 되고, 부스 안에 CCTV 없으니 그곳에서 갈아입으셔도 됩니다."]
    },
    {
      title: "촬영 시간 추가 되나요?",
      content: ["뒤 타임에 예약손님 없이 널널한 경우 5분 추가시간 주시되, 그 이상을 원하실 경우 인원수에 상관없이 10분 당 10,000원 결제해주시면 됩니다."]
    },
    // {
    //   title: "",
    //   content: [""]
    // },
];

const accordionContainer = document.getElementById("storeAccordion");

accordionData.forEach((item, index) => {
const idSuffix = index + 1; // 고유 id용 숫자
const headerId = `heading${idSuffix}`;
const collapseId = `collapse${idSuffix}`;

const contentHtml = item.content.map(text => `<p>${text}</p>`).join("");

accordionContainer.innerHTML += `
    <div class="accordion-item">
        <h2 class="accordion-header" id="${headerId}">
            <button class="accordion-button collapsed pre-m" type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#${collapseId}"
                    aria-expanded="false"
                    aria-controls="${collapseId}">
            <strong>Q. &nbsp;</strong>${item.title}
            </button>
        </h2>
        <div id="${collapseId}" class="accordion-collapse collapse"
                aria-labelledby="${headerId}">
            <div class="accordion-body">
            ${contentHtml}
            </div>
        </div>
    </div>
`;
});