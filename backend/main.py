from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from fastapi import HTTPException
from starlette.exceptions import HTTPException as StarletteHTTPException

import mimetypes
import time
import sys
import os

from apps.v1.main import app as v1_app
from config import FRONTEND_BUILD_DIR, STATIC_DIR

app = FastAPI()

origins = ["*"]


class SPAStaticFiles(StaticFiles):
    async def get_response(self, path: str, scope):
        try:
            return await super().get_response(path, scope)
        except (HTTPException, StarletteHTTPException) as ex:
            if ex.status_code == 404:
                return await super().get_response("index.html", scope)
            else:
                raise ex


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def check_url(request: Request, call_next):
    start_time = int(time.time())
    response = await call_next(request)
    process_time = int(time.time()) - start_time
    response.headers["X-Process-Time"] = str(process_time)

    return response


app.mount("/api/v1", v1_app)
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


mimetypes.add_type("text/javascript", ".js")
app.mount(
    "/",
    SPAStaticFiles(directory=FRONTEND_BUILD_DIR, html=True),
    name="spa-static-files",
)
