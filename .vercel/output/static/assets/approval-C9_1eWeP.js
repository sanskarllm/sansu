import{a as e,n as t,t as n}from"./jsx-runtime-B-hcVAMW.js";import{t as r}from"./link-D8yIkB0Z.js";import{U as i,o as a,s as o}from"./index-D2LthzVl.js";import{t as s}from"./textarea-Bfdv6YGK.js";import{t as c}from"./badge-Di5CYhi_.js";var l=e(t()),u=n(),d=`Dear Lisa,

Thank you for the RFQ on 12,000 m navy cotton poplin, 40s × 40s, 133 × 72, 58".

Draft for owner approval (not sent):
- ₹185 / m ex-mill, FOB Nhava Sheva
- Validity 15 days
- Lab dip 7 working days after shade standard
- CIF Rotterdam on request after freight

Please confirm Pantone 19-4052 as the shade standard and whether a 2,000 m trial is required.

Regards,
Khanna Weaves`;function f(){let e=o(e=>e.pushAudit),t=o(e=>e.track),[n,f]=(0,l.useState)(d),[p,m]=(0,l.useState)(`open`);function h(n,r){m(n),e({actor:`Owner`,action:r,detail:`Buyer reply · Nordic Home`}),t(`approval`,n),a(r)}return(0,u.jsxs)(`main`,{className:`mx-auto max-w-3xl px-4 py-12`,children:[(0,u.jsx)(`p`,{className:`text-sm text-primary`,children:`Humans stay in control`}),(0,u.jsx)(`h1`,{className:`font-display mt-2 text-4xl tracking-tight`,children:`Approval simulator`}),(0,u.jsx)(`p`,{className:`mt-2 text-muted`,children:`A realistic AI-drafted customer reply. Approve, edit, reject, or escalate. Nothing leaves without you.`}),(0,u.jsxs)(`div`,{className:`mt-6 flex flex-wrap gap-2`,children:[(0,u.jsx)(c,{tone:`primary`,children:`Sandbox`}),(0,u.jsx)(c,{children:`Quotation agent`}),(0,u.jsx)(c,{tone:p===`open`?`warn`:`ok`,children:p===`open`?`Waiting`:p})]}),(0,u.jsx)(s,{className:`mt-6 min-h-72 font-sans`,value:n,onChange:e=>f(e.target.value)}),(0,u.jsxs)(`div`,{className:`mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4`,children:[(0,u.jsx)(i,{type:`button`,onClick:()=>h(`approved`,`Approved — still not sent until you dispatch`),children:`Approve`}),(0,u.jsx)(i,{type:`button`,variant:`outline`,onClick:()=>h(`edited`,`Edit kept. Send is still yours.`),children:`Edit`}),(0,u.jsx)(i,{type:`button`,variant:`outline`,onClick:()=>h(`rejected`,`Rejected. Draft discarded.`),children:`Reject`}),(0,u.jsx)(i,{type:`button`,variant:`outline`,onClick:()=>h(`escalated`,`Escalated to GM.`),children:`Escalate`})]}),(0,u.jsxs)(`p`,{className:`mt-8 text-sm`,children:[`Next:`,` `,(0,u.jsx)(r,{to:`/workspace`,className:`text-primary`,children:`see it on the mill desk`})]})]})}export{f as component};