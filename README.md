# Theo Repotest
Test webhook Wed Apr  8 10:36:17 PM UTC 2026
Auto-deploy test Wed Apr  8 10:48:31 PM UTC 2026
Deploy via push 1775690647
Real deploy 1775691699
Test commit status 1775722000
Commit status test 1775722207
Final status test 1775722363
E2E commit status 1775723031
Final E2E 1775724206
Final commit status E2E 1775725374
Clean E2E 1775726078
Success test 1775727011
Final success E2E 1775727985

J-09 LIVE dogfood 1780722558

Build-cluster RBAC fix 1780722978

J-17 realtime test 1780731033
J-17 LIVE step events test 1780731622
step events live 1780732288
sponsor live 1780732601
sponsor realtime watch 1780733235
sponsor watch #3 1780733594
watch #4 1780734251
synthetic started fix 1780735058
BFF flush fix 1780735579
post-revert validation 1780736178
validate tabs 1780736924
loki test 1780737361
loki persisted 1780751287
layer 2 markers 1780752898
validate L2 markers v2 1780753222
L2 markers v3 1780753491
L4 marker parsing validation 2026-06-06T14:11:46Z
L5 rich failure context validation 2026-06-06T14:35:11Z
L5 sponsor visual validation 2026-06-06T14:40:43Z
L6 deployments grid Running ghost fix 2026-06-06T14:51:37Z
J-17 full closure validation 2026-06-06T15:29:15Z

## T6.2 Cleanroom preview test — 2026-06-11

LIVE re-validation post-Cleanroom TOTAL chain (commits 07326c68, 21c0fae1, f4ccb6c2, b76b9e9f, 4e32e474 + OpenBao manual provisioning per follow-up plan 2026-06-11-vault-bootstrap-canonical-in-task-setup).

Triggers J-23 preview canonical chain end-to-end against dev-public:
- webhook → cloud-dev.usetheo.dev/api/v1/webhooks/github
- PreviewEnvironment CR + canonical labels
- Namespace theo-tn-994580dad62e46df-teste-preview-pr-N
- ArgoCD App destination canonical formula
- Wildcard TLS via DNS-01 LE
- URL: <tenant>-teste-<entryApp>-preview-pr-N.preview-dev.usetheo.dev

