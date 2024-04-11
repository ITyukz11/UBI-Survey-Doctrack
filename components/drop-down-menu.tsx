import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { FaBook, FaCopyright, FaSearch, FaUser } from "react-icons/fa";
import { MdEngineering, MdInventory, MdLiveHelp, MdLogout } from "react-icons/md";
import { DialogAccomplishment } from "./encode-accomplishment/dialog-accomplishment";
import { useState } from "react";
import { HelpDialog } from "./help-dialog";
import { CreditsDialog } from "./credits-dialog";


interface DropDownMenuComponentProps {
    
}

export const DropDownMenuComponent = ({}:DropDownMenuComponentProps) =>{
    const [dialogAccomplishment, setDialogAccomplishment] = useState(false);
    const [helpDialog, setHelpDialog] = useState(false);
    const [creditsDialog, setCreditsDialog] = useState(false);

    const router = useRouter();
    const session = useSession();


    return(
      <>
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{session.data?.user?.name}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={()=> router.push('/profile')}>
             <FaUser/>  Profile
            </DropdownMenuItem>
          <DropdownMenuSeparator />

            <DropdownMenuItem onClick={()=> router.push('/')}>
              <FaSearch/> Doctrack
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=> router.push('/admin/logs')}>
              <FaBook/> Logs
            </DropdownMenuItem>

          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Encode</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={()=> setDialogAccomplishment(true)}><MdEngineering/>Accomplishment</DropdownMenuItem>
                  <DropdownMenuItem><MdInventory/>Inventory</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled>More...</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={()=> setHelpDialog(true)}><MdLiveHelp/>  Help</DropdownMenuItem>
          <DropdownMenuItem onClick={()=> setCreditsDialog(true)}><FaCopyright/> Credits</DropdownMenuItem>
          <DropdownMenuItem disabled>API</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            <MdLogout/> Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogAccomplishment openDialog={dialogAccomplishment} closeDialog={()=> setDialogAccomplishment(false)}/>
      <HelpDialog openDialog={helpDialog} closeDialog={()=> setHelpDialog(false)}/> 
      <CreditsDialog openDialog={creditsDialog} closeDialog={()=> setCreditsDialog(false)}/> 
      </>
)
}