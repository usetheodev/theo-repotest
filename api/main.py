"""Theo Repotest API — Python backend deployed via GitHub push"""
from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import os

PORT = int(os.getenv("PORT", "8000"))

class APIHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/health":
            self._json(200, {"status": "ok", "service": "repotest-api"})
        elif self.path == "/api/info":
            self._json(200, {
                "name": "Theo Repotest",
                "version": "1.0.0",
                "description": "Theo — CI Green, Full Pipeline",
                "deploy_method": os.getenv("THEO_DEPLOY_METHOD", "github-push"),
            })
        else:
            self._json(404, {"error": "not found"})

    def _json(self, status, data):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())

    def log_message(self, format, *args):
        pass

if __name__ == "__main__":
    server = HTTPServer(("0.0.0.0", PORT), APIHandler)
    print(f"Repotest API running on port {PORT}")
    server.serve_forever()
