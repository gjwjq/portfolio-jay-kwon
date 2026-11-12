# SQL — DCL / TCL 정리

## 1. GRANT / REVOKE

**GRANT — 권한 부여**

```
GRANT 권한
ON 데이터베이스명.테이블명
TO 사용자;
```

**REVOKE — 권한 회수**

```
REVOKE 권한
ON 데이터베이스명.테이블명
FROM 사용자;
```

> [!tip] 암기
> 
> - `GRANT` → `ON ... TO`
>     
> - `REVOKE` → `ON ... FROM`
>     
> - 권한: `SELECT`, `INSERT`, `UPDATE`, `DELETE` 등
>     

---

## 2. 트랜잭션 (Transaction)

여러 SQL 작업을 하나로 묶어 **변경사항을 확정하거나 취소**하는 기능.

### 사용 예시

```
START TRANSACTION;

UPDATE STUDENT SET SCORE = 90 WHERE ID = 1;

SAVEPOINT A;

UPDATE STUDENT SET SCORE = 100 WHERE ID = 2;

ROLLBACK TO SAVEPOINT A;

COMMIT;
```

### 명령어 정리

- `START TRANSACTION;` → 트랜잭션 시작
    
- `SAVEPOINT A;` → A라는 중간 복귀 지점 지정
    
- `ROLLBACK TO SAVEPOINT A;` → A 이후의 변경사항 취소 (트랜잭션 유지)
    
- `ROLLBACK;` → 미확정 변경사항 전체 취소 (트랜잭션 종료)
    
- `COMMIT;` → 변경사항 확정 및 트랜잭션 종료
    

> [!important] 핵심
> 
> - `ROLLBACK`은 오류를 자동 감지하는 것이 아니라 **변경사항을 취소하라는 명령어**입니다.
>     
> - `COMMIT`으로 확정한 변경사항은 일반적인 `ROLLBACK`으로 되돌릴 수 없습니다.

