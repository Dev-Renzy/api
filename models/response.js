class Response {
  constructor() {
    this.headers = { status: 200, timestamp: new Date().toISOString() };
    this.data = { body: null, message: null };
    this.error = { body: null, message: null };
  }

  setSuccessResponse(body, message) {
    this.data.body = body;
    this.data.message = message;
  }
  setErrorResponse(status, body, message) {
    this.headers.status = status;
    this.error.body = body;
    this.error.message = message;
  }

  get state(){
      return this
  }
}

module.exports = Response
