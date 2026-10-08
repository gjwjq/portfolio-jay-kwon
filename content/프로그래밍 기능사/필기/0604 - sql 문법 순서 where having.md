---
title: "0604 - SQL 문법 순서 / WHERE / HAVING"
---

이 페이지는 **문법 순서랑 조건 위치**만 정리.

## SELECT 기본 순서

```
SELECT 컬럼명
FROM 테이블명
WHERE 조건
GROUPBY 그룹기준
HAVING 그룹조건
ORDERBY 정렬기준;
```

암기:

```
SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY
```

## WHERE

일반 조건.

```
SELECT*
FROM student
WHERE age>=17;
```

뜻:

```
age가 17 이상인 학생만 조회
```

## HAVING

그룹 조건.

```
SELECT dept,COUNT(*)
FROM student
GROUPBY dept
HAVINGCOUNT(*)>=3;
```

뜻:

```
dept별로 묶은 뒤
학생 수가 3명 이상인 dept만 출력
```

비교:

| 구분 | 의미 |
| --- | --- |
| `WHERE` | 그룹으로 묶기 전 조건 |
| `HAVING` | 그룹으로 묶은 후 조건 |