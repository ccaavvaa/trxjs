import { Subject } from "@reactivex/rxjs";

interface IMessage {
    kind: string;
    body?: any;
}

type Rule = (msg: IMessage) => Promise<void>;

class RxjsT1 {
    public execute(): void {
        let router = new Subject<IMessage>();
        let rules: any = {
            "1": async (msg: IMessage) => {
                console.log("1 ", msg);
                await this.af(msg, "1");
                router.next({ kind: "2", body: "from 1" });
            },
            "2": async (msg: IMessage) => {
                console.log("2 ", msg);
                await this.af(msg, "2");
            },
        };
        router.subscribe({
            complete: () => { },
            next: (message: IMessage) => {
                rules[message.kind](message);
            },
            error: (err) => console.log("err ", err),
        });
        router.subscribe({
            complete: () => { },
            next: (message: IMessage) => {
                console.log("trace ", message);
            },
            error: (err) => console.log("err ", err),
        });
        router.next({ kind: "1" });
        router.next({ kind: "2" });
    }

    private af(msg: IMessage, id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("async ", id, " ", msg);
                resolve();
            });
        });
    }
}

let test = new RxjsT1();
test.execute();
