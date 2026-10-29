`note = sorted(a, key=b, reverse=c)` 같은 코드에서 순서대로
"a b c" 가 의미하는게 무엇일까.

일단 sorted -> 배열 정렬이라고 알고있었는데 파이썬에서 다시보니 좀 헷갈려,
더 확실하게 알기 위해서 글 작성.

일단 정렬 까지는 맞으며, sorted 안의 인자는 순서대로
"sorted(정렬할 대상, key=정렬 기준 함수, reverse=뒤집기 여부)"
위와 같이 알고있다.

**예시 코드**

python

```python
nums = [5, -2, 3, -8]

note = sorted(nums, key=lambda x: abs(x), reverse=True)
print(note)  # [-8, 5, 3, -2]
```

- `nums`: 정렬할 대상
- `key=lambda x: abs(x)`: 절댓값(부호를 뗀 크기)을 기준으로 비교 → 8, 5, 3, 2
- `reverse=True`: 큰 것부터