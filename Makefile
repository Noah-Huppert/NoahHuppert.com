.PHONY: upload ssh

SRC_DIR="./www"

REMOTE_USER="root"
REMOTE_HOST="www.noahh.io"
REMOTE_PARENT_DIR="/var"

# upload pushes the repository contents to the remote server
upload:
	scp -r "${SRC_DIR}" "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PARENT_DIR}"

# ssh opens an ssh connection to our server
ssh:
	ssh "${REMOTE_USER}@${REMOTE_HOST}"
