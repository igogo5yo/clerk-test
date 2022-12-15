import { IMember } from "../../types";

const invited = new Map<string, IMember>();

invited.set('alanna77@gmail.com', {"fullName":"Boyd Stroman","email":"alanna77@gmail.com","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/843.jpg","role":"admin","isPending":true,"inboxes":["work-inbox","demo-clerk"]});
invited.set('shea.hayes28@gmail.com', {"fullName":"Sophie Simonis","email":"shea.hayes28@gmail.com","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/414.jpg","role":"agent","isPending":true,"inboxes":["demo-clerk","long-name"]});
invited.set('frederik.fahey69@hotmail.com', {"fullName":"Guadalupe Rolfson II","email":"frederik.fahey69@hotmail.com","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1182.jpg","role":"member","isPending":false,"inboxes":["work-inbox"]});
invited.set('abbigail_abbott76@hotmail.com', {"fullName":"Randy Mraz V","email":"abbigail_abbott76@hotmail.com","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/618.jpg","role":"manager","isPending":false,"inboxes":["demo-clerk","long-name"]});

export default function handler(req: any, res: any) {

  switch (req.method) {
    case 'DELETE': {
      invited.delete(String(req.body));
      break;
    }
    case 'POST': {
      invited.set((req.body as IMember).email, req.body);
      break;
    }
    case 'PUT': {
      (req.body as IMember[]).forEach(member => invited.set(member.email, member))
      break;
    }
  }

  res.status(200).json([...invited.values()]);
}

