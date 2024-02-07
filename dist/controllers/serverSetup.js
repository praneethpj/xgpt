"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const http_1 = __importDefault(require("http"));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = http_1.default.createServer((req, res) => {
            // This is just a placeholder, you can handle HTTP requests if needed
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Hello World\n');
        });
        try {
            // Listen on a specified port
            const PORT = process.env.PORT || 5000;
            server.listen(PORT, () => {
                console.log(`Server is listening on port ${PORT}`);
            });
            return server;
        }
        catch (err) {
            console.log('Error connecting to the database:', err);
            throw err;
        }
    });
}
exports.startServer = startServer;
//# sourceMappingURL=serverSetup.js.map