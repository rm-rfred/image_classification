from fastapi import APIRouter, File, UploadFile

router = APIRouter()

@router.get("/", status_code=200)
def hello_world():
    return {
        "message": "Hello World"
    }


@router.post("/classify", status_code=200)
def post_image():
    pass