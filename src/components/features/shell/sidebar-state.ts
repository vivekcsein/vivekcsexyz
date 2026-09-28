export const SIDEBAR_STORAGE_KEY = "kb:sidebar";
export const SIDEBAR_EVENT = "kb:sidebar";

/** Runs before paint (inlined into <head>) so the rail never flashes open. */
export const sidebarInitScript = `try{if(localStorage.getItem("${SIDEBAR_STORAGE_KEY}")==="collapsed")document.documentElement.dataset.sidebar="collapsed"}catch(e){}`;
