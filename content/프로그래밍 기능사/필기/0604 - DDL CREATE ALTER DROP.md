---
title: "0604 - DDL / CREATE / ALTER / DROP"
---

이 페이지는 **테이블 구조 만들고 바꾸는 것**만 정리.

## CREATE

```
CREATETABLE student (
  idINTPRIMARYKEY,
  nameVARCHAR(20)NOTNULL,
  ageINT
);
```

뜻:

```
student 테이블 생성
id는 기본키
name은 NULL 불가
age는 숫자
```

## ALTER

이미 있는 테이블 구조 변경.

### 컬럼 추가

```
ALTERTABLE student
ADD phoneVARCHAR(20);
```

뜻:

```
student 테이블에 phone 컬럼 추가
```

### 컬럼 삭제

```
ALTERTABLE student
DROPCOLUMN phone;
```

뜻:

```
phone 컬럼 삭제
```

### 조건 추가

```
ALTERTABLE student
ADDCONSTRAINT chk_ageCHECK (age>=0);
```

뜻:

```
age는 0 이상만 가능하다는 조건 추가
```

암기:

```
ALTER TABLE 테이블명
ADD CONSTRAINT 조건이름 CHECK (조건식);
```

## DROP

```
DROPTABLE student;
```

뜻:

```
student 테이블 자체 삭제
구조 + 데이터 전부 삭제
```

---