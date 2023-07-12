import {ACAdapter} from "./ACAdapter";
import {Adapter} from "../common/Adapter";

new ACAdapter(process.argv[2])
    .subscribe(Adapter.Type.Static, (e) => { console.log(e)  })
    .subscribe(Adapter.Type.Physics, (e) => { console.log(e)  })
    .start();

