#!/bin/bash
if [[ $1 = "login" ]]; then
    ssh -i "./certs/viclient-sing.pem" ubuntu@18.142.182.115

elif [[ $1 = "rs" ]]; then
    ssh -i "./certs/viclient-sing.pem" ubuntu@18.142.182.115 \
        "/home/ubuntu/.nvm/versions/node/v18.17.1/bin/pm2 reload service"

elif [[ $1 = "sync" ]]; then
    echo "Test rsync (dry run)";
    rsync -avL --dry-run --exclude-from 'certs/rsync-excludes.txt' \
        -e "ssh -i certs/viclient-sing.pem" \
        ./bundle/ ubuntu@18.142.182.115:/home/ubuntu/apps/chattm/

elif [[ $1 = "sync-true" ]]; then
    rsync -avL --exclude-from 'certs/rsync-excludes.txt' \
        -e "ssh -i certs/viclient-sing.pem" \
        ./bundle/ ubuntu@18.142.182.115:/home/ubuntu/apps/chattm/

elif [[ $1 = "get-db" ]]; then
    rsync -avL --exclude-from 'certs/rsync-excludes.txt' \
        -e "ssh -i certs/viclient-sing.pem" \
        ubuntu@18.142.182.115:/home/ubuntu/apps/stores/ ./stores/prod/

elif [[ $1 = "login-hn" ]]; then
    ssh -i "./certs/chattm-oregon.pem" ubuntu@35.88.250.146

elif [[ $1 = "login-cpp" ]]; then
    ssh -i "./certs/chattm-oregon.pem" ubuntu@34.216.178.2

elif [[ $1 = "login-sm" ]]; then
    ssh -i "./certs/chattm-oregon.pem" ubuntu@54.218.110.103
fi;

# ./server -m models/vicuna-13b-v1.5.Q4_0.gguf
# cd examples/server
#   python3 api_like_OAI.py --host 0.0.0.0 --port 8000
# - sudo docker run --gpus all -v files:/workspace -it --rm nvcr.io/nvidia/pytorch:23.08-py3
# - /var/lib/docker/volumes/files/_data
# Nvidia Pytorch docker
#   sudo docker run --gpus all -it --rm -v "/home/ubuntu/fchat":/workspace/fchat -v "/.cache/huggingface/hub/":"/workspace/huggingface/hub/" nvcr.io/nvidia/pytorch:23.08-py3
# python3 -c 'import torch;import os; os.environ['CUDA_VISIBLE_DEVICES'] = '0' ;print(torch.cuda.is_available())'
# nvidia-driver-535
# lg 52.43.149.77
# sm 35.93.56.169
# sudo apt install nvidia-driver-535 nvidia-dkms-535
# rebit saltar-sing.pem 18.141.204.49
# analytics Analytics-Singapore.pem 13.229.228.168
# screens 
# - ctr
#     python3 -m fastchat.serve.controller
# - mdl
#     source venv/activate
#     TRANSFORMERS_CACHE=./models python3 -m fastchat.serve.model_worker --model-path lmsys/vicuna-13b-v1.5
#   python3 -m fastchat.serve.model_worker --model-path ./models/vicuna-13b-v1.5
#     python3 -m fastchat.serve.model_worker --model-path lmsys/vicuna-7b-v1.5 --load-8bit --cpu-offloading
# python3 -m fastchat.serve.model_worker \
#     --model-path models/vicuna-7B-1.1-GPTQ-4bit-128g \
#     --gptq-wbits 4 \
#     --gptq-groupsize 128
# - srv
#     python3 -m fastchat.serve.openai_api_server --host 0.0.0.0 --port 8000

# deb [arch=amd64] https://repo.radeon.com/amdgpu/latest/ubuntu/dists/jammy/Release ubuntu main