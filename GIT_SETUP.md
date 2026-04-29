# 깃허브 푸시 가이드 — Cheongna 레포 초기 셋업

원격 저장소: `https://github.com/hanshhx/Cheongna.git`

## 0. 먼저 환경변수 분리 (한 번만)

키 노출 안 되게끔 `.env.local` 을 먼저 만들어 두기. 깃에는 안 올라감.

```bash
# 프로젝트 루트(cheongna-sk-v1)에서
cp .env.example .env.local
```

`.env.local` 을 열어서 실제 값 채워:

```env
NEXT_PUBLIC_WEB3FORMS_KEY=ab9a4476-07ee-4fcc-b4e6-d159667306c1
NEXT_PUBLIC_SITE_URL=https://cnskv1.com
# 나머지는 비어 있어도 빌드는 됨. GA4/네이버 ID 받으면 그때 채우면 됨.
```

`.gitignore` 가 `.env`, `.env.*` 패턴 전부 차단하기 때문에 위 파일은 절대 커밋 안 돼. 안전.

## 1. 깃 초기화 + 첫 커밋

윈도우 PowerShell 또는 Git Bash 에서 — 프로젝트 루트(`cheongna-sk-v1`) 안:

```bash
git init
git add .
git status        # .env.local 이 목록에 없는지 확인 (없어야 정상)
git commit -m "Initial commit — 청라 SK V1 분양 사이트"
```

`git status` 결과에 `.env.local` 이 보이면 멈추고 알려줘 (그건 깃 상태가 잘못된 거).

## 2. 원격 연결 + 푸시

레포가 비어 있다고 가정:

```bash
git branch -M main
git remote add origin https://github.com/hanshhx/Cheongna.git
git push -u origin main
```

**레포에 이미 README 같은 게 들어있다면** (깃허브에서 "Initialize this repo with README" 옵션을 체크했던 경우):

```bash
git pull origin main --allow-unrelated-histories
# 충돌 나는 README 가 있으면 너의 README 로 결정:
#   git checkout --ours README.md
#   git add README.md && git commit
git push -u origin main
```

## 3. 푸시한 다음 반드시 확인

깃허브 웹에서 레포 열어서:

1. `.env.local` 이 **목록에 없는지** 재확인. 보이면 즉시 삭제 + 키 재발급.
2. `components/ConsultForm.tsx`, `QuickConsult.tsx` 안에 평문 키가 **없는지** 확인 (모두 `WEB3FORMS_ACCESS_KEY` 변수만 보여야 함).

## 4. 배포 시 (Vercel / Cloudflare / 직접 호스팅)

빌드 환경의 환경변수 설정 화면에서 같은 변수를 다시 등록:

| Key | Value |
|---|---|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | (실제 키) |
| `NEXT_PUBLIC_SITE_URL` | `https://cnskv1.com` |
| `NEXT_PUBLIC_GA4_ID` | (받으면) |
| ... | ... |

`NEXT_PUBLIC_*` 접두어는 **클라이언트(브라우저)에 노출되는 게 정상** (Next.js 규칙). web3forms 키는 도메인 화이트리스트로 보호되니 노출돼도 외부 도메인에서 사용 못 함 — 단, 깃 저장소에 평문으로 박아두는 건 GitHub 가 자동 스캔해서 키 폐기시키는 경우가 있어서 분리한 거.

## 5. 만약 실수로 키가 깃에 올라간 적 있다면

키 즉시 폐기 + 재발급:

1. [web3forms.com](https://web3forms.com) 로그인 → 액세스 키 회전(rotate)
2. `.env.local` 의 `NEXT_PUBLIC_WEB3FORMS_KEY` 새 값으로 교체
3. `git filter-repo` 또는 `git filter-branch` 로 히스토리에서 키 제거 후 force push
4. 협업자에게 알리고 새로 클론 받게 함

## 6. 다음에 변경 사항 푸시할 때

```bash
git add .
git commit -m "변경 메시지"
git push
```

— 끝.
