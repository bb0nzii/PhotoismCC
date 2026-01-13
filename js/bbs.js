import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  updateDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
  limit,
  startAfter,
  endBefore,
  limitToLast
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


document.addEventListener("DOMContentLoaded", () => {
    const PAGE_SIZE = 5;
    let pageStack = []; // 페이지 히스토리
    let currentPage = 0;


    let editingId = null;
    const titleInput = document.getElementById("bbs-title");
    const contentInput = document.getElementById("bbs-content");
    const submitBtn = document.getElementById("bbs-submit");
    const listEl = document.getElementById("bbs-list");
    const authorInput = document.getElementById("bbs-author");


    // 🔹 글 등록
    submitBtn.addEventListener("click", async () => {
        const author = authorInput.value.trim();
        const title = titleInput.value.trim();
        const content = contentInput.value.trim();

        if (!author || !title || !content) {
            alert("모든 항목을 입력하세요.");
            return;
        }

        try {
            if (editingId) {
                // ✏️ 수정
                await updateDoc(doc(db, "bbs", editingId), {
                author,
                title,
                content
                });

                editingId = null;
                submitBtn.textContent = "등록";
            } else {
                // ➕ 신규 등록
                await addDoc(collection(db, "bbs"), {
                author,
                title,
                content,
                createdAt: serverTimestamp()
                });
            }

            authorInput.value = "";
            titleInput.value = "";
            contentInput.value = "";

            loadPosts();
        } catch (err) {
            console.error(err);
            alert("처리 실패");
        }
    });

    contentInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
            submitBtn.click();
        }
    });



    // 🔹 글 목록 불러오기
    async function loadPosts(direction = "init") {
        listEl.innerHTML = "";

        let q;

        // 최초 로드
        if (direction === "init") {
            pageStack = [];
            currentPage = 0;

            q = query(
                collection(db, "bbs"),
                orderBy("createdAt", "desc"),
                limit(PAGE_SIZE)
            );
        }

        // 다음 페이지
        if (direction === "next") {
            const current = pageStack[currentPage];
            if (!current?.lastDoc) return;

            q = query(
                collection(db, "bbs"),
                orderBy("createdAt", "desc"),
                startAfter(current.lastDoc),
                limit(PAGE_SIZE)
            );
        }

        // 이전 페이지
        if (direction === "prev") {
            if (currentPage === 0) return;

            currentPage--;
            renderPage(pageStack[currentPage]);
            updatePaginationButtons();
            return;
        }

        const snapshot = await getDocs(q);
        if (snapshot.empty) {
            updatePaginationButtons();
            return;
        }

        const docs = snapshot.docs;

        // 🔑 다음 페이지일 경우에만 페이지 증가
        if (direction === "next") {
            currentPage++;
        }

        pageStack[currentPage] = {
            docs,
            lastDoc: docs[docs.length - 1]
        };

        renderPage(pageStack[currentPage]);
        updatePaginationButtons();
    }


    function updatePaginationButtons() {
        const prevBtn = document.getElementById("prev-page");
        const nextBtn = document.getElementById("next-page");

        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = pageStack[currentPage]?.docs.length < PAGE_SIZE;
    }

    document.getElementById("next-page").addEventListener("click", () => {
        loadPosts("next");
    });

    document.getElementById("prev-page").addEventListener("click", () => {
        loadPosts("prev");
    });


    function renderPage(page) {
        listEl.innerHTML = "";

        page.docs.forEach(docSnap => {
            const data = docSnap.data();
            const id = docSnap.id;

            const item = document.createElement("article");
            item.className = "bbs-item";

            item.innerHTML = `
                <h3 class="bbs-item__title font-bold">${data.title}</h3>
                <p class="bbs-item__author">작성자: ${data.author}</p>
                <p>${data.content.replace(/\n/g, "<br>")}</p>
                <button class="bbs-item__edit btn btn-sm btn-dark">수정</button>
                <button class="bbs-item__delete btn btn-sm btn-danger">삭제</button>
            `;

            // 수정
            item.querySelector(".bbs-item__edit").addEventListener("click", () => {
                authorInput.value = data.author;
                titleInput.value = data.title;
                contentInput.value = data.content;
                editingId = id;
                submitBtn.textContent = "수정";
            });

            // 삭제
            item.querySelector(".bbs-item__delete").addEventListener("click", async () => {
                if (!confirm("정말 삭제할까요?")) return;
                await deleteDoc(doc(db, "bbs", id));
                loadPosts("init"); // 삭제 후 최신 페이지로
            });

            listEl.appendChild(item);
        });
    }




    loadPosts("init"); // 페이지 진입 시 최초 로드
});