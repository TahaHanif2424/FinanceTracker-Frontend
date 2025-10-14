import { create } from "zustand";

interface DialogState {
  isOpen: boolean;
  dialogName: string | null;
  dialogData?: any;

  openDialog: (name: string, data?: any) => void;
  closeDialog: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  dialogName: null,
  dialogData: undefined,

  openDialog: (name, data) =>
    set({
      isOpen: true,
      dialogName: name,
      dialogData: data,
    }),

  closeDialog: () =>
    set({
      isOpen: false,
      dialogName: null,
      dialogData: undefined,
    }),
}));
