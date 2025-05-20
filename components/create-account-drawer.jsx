"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { createAccount } from "@/actions/dashboard";
import { accountSchema } from "@/app/lib/schema";

export function CreateAccountDrawer({ children }) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "CURRENT",
      balance: "",
      isDefault: false,
    },
  });

  const { loading: createAccountLoading, fn: createAccountFn, error, data: newAccount } = useFetch(createAccount);

  const onSubmit = async (data) => {
    await createAccountFn(data);
  };

  useEffect(() => {
    if (newAccount) {
      toast.success("Account created successfully");
      reset();
      setOpen(false);
    }
  }, [newAccount, reset]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to create account");
    }
  }, [error]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="bg-white ">
        <DrawerHeader>
          <DrawerTitle className="font-medium text-xl">Create New Account</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-4 ">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" >
                Account Name
              </label>
              <Input className="rounded"
                id="name"
                placeholder="e.g., Main Checking"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Account Type
              </label>
              <Select onValueChange={(value) => setValue("type", value)} defaultValue={watch("type")}
              >
                <SelectTrigger id="type" className="rounded">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="CURRENT" className="border-b cursor-pointer ">Current</SelectItem>
                  <SelectItem value="SAVINGS" className="cursor-pointer">Savings</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-sm text-red-500">{errors.type.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="balance" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Initial Balance
              </label>
              <Input className="rounded"
                id="balance"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("balance")}
              />
              {errors.balance && (
                <p className="text-sm text-red-500">{errors.balance.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between rounded-lg border-2 shadow-md p-3">
              <div className="space-y-0.5">
                <label htmlFor="isDefault" className="text-base font-medium cursor-pointer">
                  Set as Default
                </label>
                <p className="text-sm text-muted-foreground">
                  This account will be selected by default for transactions
                </p>
              </div>
              <Switch
                id="isDefault"
                checked={watch("isDefault")}
                onCheckedChange={(checked) => setValue("isDefault", checked)}
                className="peer relative inline-flex h-[24px] w-[44px] items-center rounded-full border-2 border-black bg-white transition-colors data-[state=checked]:bg-black"
              >
                {/* Thumb (Switch Ball) */}
                <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-gray-500 transition-transform peer-checked:translate-x-5 peer-checked:bg-white"></span>
              </Switch>

            </div>

            <div className="flex gap-4 pt-4">
              <DrawerClose asChild>
                <Button type="button" variant="outline" className="flex-1 rounded bg-gray-200">Cancel</Button>
              </DrawerClose>
              <Button 
                type="submit"
                className="flex-1 rounded border bg-gray-700 text-white hover:bg-gray-900 hover:text-white"
                disabled={createAccountLoading}
              >
                {createAccountLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin shadow-md border-2" />
                    Creating...
                  </>
                ) : (
                  "Create Account"
                )} 
              </Button>
            </div>
          </form>
        </div >
      </DrawerContent >
    </Drawer>
  );
}