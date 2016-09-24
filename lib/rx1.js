"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const rxjs_1 = require("@reactivex/rxjs");
class RxjsT1 {
    execute() {
        let router = new rxjs_1.Subject();
        let rules = {
            "1": (msg) => __awaiter(this, void 0, void 0, function* () {
                console.log("1 ", msg);
                yield this.af(router, msg, "1");
            }),
            "2": (msg) => __awaiter(this, void 0, void 0, function* () {
                console.log("2 ", msg);
                yield this.af(router, msg, "2");
            }),
        };
        router.subscribe({
            complete: () => { },
            next: (message) => {
                rules[message.kind](message);
            },
            error: (err) => console.log("err ", err),
        });
        router.subscribe({
            complete: () => { },
            next: (message) => {
                console.log("trace ", message);
            },
            error: (err) => console.log("err ", err),
        });
        router.next({ kind: "1" });
        router.next({ kind: "2" });
    }
    af(router, msg, id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("async ", id, " ", msg);
                if (id == "1") {
                    router.next({ kind: "2", body: "from 1" });
                }
                resolve();
            });
        });
    }
}
let test = new RxjsT1();
test.execute();
//# sourceMappingURL=/Users/catalin/trxjs/lib/rx1.js.map