> 📚 이 블로그는 [academicpages](https://github.com/academicpages/academicpages.github.io) 템플릿을 기반으로 만들어졌습니다.
## todo
todo: kr, en 버튼 만들기 >> 카테고리에 각 언어별로
## 예상 가능한 오류
1. 부모 카테고리가 달라도 나의 카테고리가 같으면 navigation에서 같은 카테고리로 묶는다.   
\>> 이경우 딱히 카테고리가 겹칠 가능성이 없어보여서 아직 놔두었다.
#  GitHub.io 블로그 글 작성 방법

---

## 글 저장 경로

모든 블로그 글은 `_posts/` 폴더에 저장한다.



## 파일 이름 규칙

파일 이름은 아래 형식으로 작성해야 Jekyll이 인식한다:

```
    YYYY-MM-DD-title.md
```

## 파일 구조 (YAML Front Matter)

글의 맨 위에는 아래와 같은 형식의 메타데이터(YAML front matter)를 포함해야 한다:

```yaml
---
title: "ROS2 설치 가이드"
permalink: /blog/ros2-setup/
excerpt: "ROS2 설치 과정을 단계별로 정리한 글입니다."
categories:
  - ROS
  - Setup
tags:
  - ros2
  - install
  - tutorial
date: 2025-05-13
parent_category: devops
category: gitlab
---
```
필드 설명

- title: 글 제목

- permalink: 고유 링크 주소

- excerpt: 블로그 홈이나 목록에서 보일 요약

- categories: 글의 대분류 (카테고리 아카이브에 사용됨)

- tags: 관련 키워드 (태그별 검색에 사용됨)

- date: 글 작성 날짜

- parent_category: 부모 카테고리

- category: 나의 카테고리
## 본문 작성
메타데이터 아래에 일반적인 마크다운(Markdown) 문법으로 글을 작성하면 된다

---

### 카테고리 구성

카테고리 같은 경우 부모 카테고리와 나의 카테고리로 나누어서 생각 할 수 있는데,   
부모 카테고리는 메타 데이터 속 `parent_category` 에 넣으면 알아서 적용이 된다.   

나의 카테고리인 경우 카테고리들은 전부 `_pages/categories` 에서 관리 한다.

이 또한 `category_name.md(markdown)` 파일로 만들어서 관리 하는데 구조는 다음과 같다

``` yaml
---
layout: category
title: "gitlab2"
permalink: /categories/gitlab2/
---
```

## local에서 확인

도커로 처음 확인시 다음 명령어를 사용한다. (프로젝트 폴더에서)
``` bash
chmod -R 777 .
docker compose up
```

그후 그냥 `docker start -a` 로 시작 하면 확인 가능