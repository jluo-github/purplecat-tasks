import { Control, Form } from "react-hook-form";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import {
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";

type CustomFormFieldProps = {
 name: string;
 control: Control<any>;
};

// https://ui.shadcn.com/docs/components/form
export function CustomFormField({ name, control }: CustomFormFieldProps) {
 return (
  <FormField
   control={control}
   name={name}
   render={({ field }) => (
    <FormItem>
     <FormLabel>{name}</FormLabel>
     <FormControl>
      <Input placeholder={name} {...field} />
     </FormControl>
     <FormMessage />
    </FormItem>
   )}
  />
 );
}

type CustomFormSelectProps = {
 name: string;
 control: Control<any>;
 items: string[];
 labelText?: string;
};

export function CustomFormSelect({
 name,
 control,
 items,
 labelText,
}: CustomFormSelectProps) {
 return (
  <FormField
   control={control}
   name={name}
   render={({ field }) => (
    <FormItem>
     <FormLabel className='capitalize'>{labelText || name}</FormLabel>
     {/* https://ui.shadcn.com/docs/components/select#form */}
     <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
       <SelectTrigger>
        <SelectValue />
       </SelectTrigger>
      </FormControl>

      <SelectContent>
       {items.map((item) => {
        return (
         <SelectItem key={item} value={item}>
          {item}
         </SelectItem>
        );
       })}
      </SelectContent>
     </Select>

     <FormMessage />
    </FormItem>
   )}
  />
 );
}

export default CustomFormSelect;
