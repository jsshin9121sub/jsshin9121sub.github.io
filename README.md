# 📖 Logs for days and books  

✨ 개인 홈페이지 겸 기록 공간 ✨  
👉 [https://jsshin9121sub.github.io](https://jsshin9121sub.github.io)  

---

## 🚀 Features

### 📚 Bookshelf  
- `books.csv` 업로드 → 연도별 / 상태별(`All`, `Reading`, `Done`)로 자동 분류  
- `Done` 책은 읽은 날짜 기준으로 정렬  
- 책 제목, 저자, 출판사, 평점, 메모까지 표시  

### ✍️ Blog  
- 포스트는 **Markdown(`.md`) 파일**로 작성  
- GitHub Actions가 자동으로 `posts.json` 생성 ✨  
- 블로그 메인에서 **제목 + 날짜 + 요약** 자동 표시  
- 코드 블록, 이미지, 링크, 헤더 지원  

---

## 🛠️ How to Use

### 📚 Bookshelf
1. 루트에 있는 `bookshelf.html` 접속  
2. `books.csv` 업로드  
3. `All / Reading / Done` 탭에서 확인  

### ✍️ Blog
1. `/blog/posts/` 폴더에 `YYYY-MM-DD-title.md` 파일 추가  
   ```markdown
   # 글 제목

   여기는 본문입니다.
   ```

2. GitHub Actions가 실행되어 posts.json 자동 업데이트

3. /blog/index.html에서 새 글이 자동으로 목록에 추가됨

---

## 🗂️ Project Structure
- index.html          # 홈
- bookshelf.html      # 책 기록
- blog/
  - index.html        # 블로그 메인
  - post.html         # 개별 포스트 뷰어
  - posts/            # Markdown 포스트 저장
    - 2025-10-03-first-post.md
    - 2025-10-04-second-post.md
    - posts.json      # Actions가 자동 생성
- assets/
  - style.css
  - script.js
- .github/workflows/
  - update-posts.yml  # posts.json 자동 생성


---

## 🔮 TODO

* 📸 블로그 포스트에 이미지 갤러리 뷰 추가
* 🔍 Bookshelf 검색/필터 기능
* 🌙 다크 모드 지원

---

## 🙋 About

Made with ❤️ and ☕

Powered by GitHub Pages + JavaScript + Markdown

---
