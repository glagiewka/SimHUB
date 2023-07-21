import {ACAdapter} from "../ACAdapter";
import {EventName} from "@common/types/event";

new ACAdapter(process.argv[2])
    .subscribe(EventName.GameConnected, (e) => { console.log(e)  })
    .start();

