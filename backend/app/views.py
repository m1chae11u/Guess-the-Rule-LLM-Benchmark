from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.responses import StreamingResponse
import logging
import sys
import os
import asyncio
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import traceback

from lib.models import CreateGame, ValidateGuess
from lib.domain.game import select_new_game, get_existing_game
from lib.domain.picnic.static_picnic.llm_gameplay import play_game_with_llms

# Initialize logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(message)s")

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Specific origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Logging Middleware
@app.middleware("http")
async def log_request(request: Request, call_next):
    logging.info(f"Request URL: {request.method} {request.url}")
    headers = dict(request.headers)
    logging.info(f"Headers: {headers}")
    query_params = dict(request.query_params)
    if query_params:
        logging.info(f"Query Parameters: {query_params}")
    response = await call_next(request)
    return response

@app.post("/guess-the-rule/game")
def create_game(payload: CreateGame):
    """Create a new game instance."""
    try:
        cls = select_new_game(payload.game_name)
        res = cls(
            difficulty=payload.difficulty,
            num_init_examples=payload.num_init_examples,
        ).create_game_instance()
        logging.info(f"Response: {res}")
        return res
    except Exception as e:
        # Log the full traceback
        logging.error("An error occurred while creating the game:")
        logging.error(traceback.format_exc())
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/guess-the-rule/game/{game_id}")
def get_game_summary(game_id: str, include_rule=False):
    """Get the summary of a game."""
    try:
        cls = get_existing_game(game_id)
        restored_game = cls.load_game()
        res = restored_game.get_game_summary(include_rule=include_rule)
        logging.info(f"Response: {res}")
        return res
    except Exception as e:
        # Log the full traceback
        logging.error("An error occurred while fetching game summary:")
        logging.error(traceback.format_exc())
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/guess-the-rule/game/{game_id}/examples")
def get_more_examples(game_id: str, n_examples: int):
    """Get more examples from the game."""
    try:
        cls = get_existing_game(game_id)
        restored_game = cls.load_game()
        res = restored_game.get_more_examples(n_examples)
        logging.info(f"Response: {res}")
        return res
    except Exception as e:
        # Log the full traceback
        logging.error("An error occurred while fetching more examples:")
        logging.error(traceback.format_exc())
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/guess-the-rule/game/validate_guess")
def validate_user_guess(payload: ValidateGuess):
    """Validate a guess against the game instance."""
    try:
        cls = get_existing_game(payload.game_id)
        restored_game = cls.load_game()
        res = restored_game.validate_guess(payload.guess)
        logging.info(f"Response: {res}")
        return res
    except Exception as e:
        # Log the full traceback
        logging.error("An error occurred while validating the guess:")
        logging.error(traceback.format_exc())
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/guess-the-rule/llm-gameplay")
async def stream_strings(game_name: str, difficulty: str, player: str, num_init_examples: int):
    game_name = game_name.lower()
    difficulty = difficulty.upper()
    player = player.lower()
    
    # Return JSON-formatted stream with appropriate media type
    return StreamingResponse(
        play_game_with_llms(difficulty, 5, player, num_init_examples),
        media_type="application/json"
    )
