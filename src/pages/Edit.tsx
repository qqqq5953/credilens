import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MultiSelect } from "@/components/ui/multi-select"
import { useState } from "react"

const positiveNumberReg = new RegExp(/^\d*(\.\d{1,2})?$/)

const formSchema = z.object({
  cardName: z.string().min(2, {
    message: "Card name must be at least 2 characters.",
  }),
  bank: z.string().min(1, {
    message: "Bank name must be at least 1 characters.",
  }),
  cashback: z.string().min(1, {
    message: "Cashback must not be empty.",
  }).regex(positiveNumberReg, {
    message: "Cashback must be 2 decimal."
  }),
  cashbackForChannelType: z.string().regex(positiveNumberReg, {
    message: "Cashback must be 2 decimal."
  }),
  channelType: z.string().array(),
  tags: z.string().array().nonempty({
    message: "Tag must not be empty."
  }),
  image: z.instanceof(File, {
    message: 'Image is required.',
  }),
})

export default function Edit() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardName: "",
      bank: "",
      cashback: "0.5",
      cashbackForChannelType: "0",
      tags: [],
      channelType: [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('values', values)
    const result = {
      ...values,
      cashback: parseFloat(values.cashback),
      cashbackForChannelType: parseFloat(values.cashbackForChannelType)
    }
    console.log('result', result);

    // localStorage.setItem('data', JSON.stringify({ id: crypto.randomUUID(), ...values }))
  }

  const bankList = [
    { label: '第一銀行', value: '第一銀行' },
    { label: '聯邦銀行', value: '聯邦銀行' },
    { label: '永豐銀行', value: '永豐銀行' },
    { label: '兆豐銀行', value: '兆豐銀行' },
  ]

  const cashbackOnChannelType = [
    { label: '外送', value: '外送' },
    { label: '網購', value: '網購' },
    { label: '交通', value: '交通' },
    { label: '住宿', value: '住宿' },
    { label: '通訊', value: '通訊' },
    { label: '運動', value: '運動' },
    { label: '旅行', value: '旅行' },
    { label: '餐廳', value: '餐廳' },
    { label: '其他', value: '其他' },
  ]

  const [preview, setPreview] = useState("")

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* 卡片名稱 */}
          <FormField
            control={form.control}
            name="cardName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>卡片名稱</FormLabel>
                <FormControl>
                  <Input placeholder="卡片名稱" {...field} />
                </FormControl>
                {/* <FormDescription>
                  {JSON.stringify(field, null, 2)}
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          {/* 發卡銀行 */}
          <FormField
            control={form.control}
            name="bank"
            render={({ field }) => (
              <FormItem>
                <FormLabel>發卡銀行</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className={!field.value ? 'text-neutral-500' : ''}>
                      <SelectValue placeholder="發卡銀行" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {bankList.map(bank => {
                      return <SelectItem value={bank.value} key={bank.value}>{bank.label}</SelectItem>
                    })}
                  </SelectContent>
                </Select>
                {/* <FormDescription>
                {JSON.stringify(field, null, 2)}
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          {/* 現金回饋 */}
          <FormField
            control={form.control}
            name="cashback"
            render={({ field }) => (
              <FormItem>
                <FormLabel>現金回饋</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Cashback" {...field} />
                </FormControl>
                {/* <FormDescription>
                  {JSON.stringify(field, null, 2)}
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          {/* 指定通路 */}
          <div className="flex justify-between gap-2">
            <div className="w-3/4">
              <FormField
                control={form.control}
                name="channelType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>指定通路</FormLabel>
                    <FormControl>
                      <MultiSelect
                        selected={field.value}
                        options={cashbackOnChannelType}
                        placeholder="指定通路"
                        {...field}
                        className="sm:w-[510px]"
                      />
                    </FormControl>
                    {/* <FormDescription>
                  {JSON.stringify(field, null, 2)}
                  </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/4">
              <FormField
                control={form.control}
                name="cashbackForChannelType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>加碼回饋</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Cashback" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                  {JSON.stringify(field, null, 2)}
                </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* 標籤 */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>分類標籤</FormLabel>
                <FormControl>
                  <MultiSelect
                    selected={field.value}
                    options={cashbackOnChannelType}
                    placeholder="標籤"
                    {...field}
                    className="sm:w-[510px]"
                  />
                </FormControl>
                <FormDescription>
                  {/* {JSON.stringify(field, null, 2)} */}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => {
              const { value, onChange, ...rest } = field

              return <FormItem>
                <FormLabel>卡片圖片</FormLabel>
                <FormControl>
                  <Input type="file" placeholder="Card Image" accept="image/*" {...rest} onChange={(event) => {
                    onChange(event.target.files![0])
                    setPreview(URL.createObjectURL(event.target.files![0]))
                  }} />
                </FormControl>
                <FormDescription>
                  {/* {JSON.stringify(field, null, 2)} */}
                </FormDescription>
                <FormMessage />
              </FormItem>
            }}
          />
          {preview && <div className="w-full max-w-sm space-y-2">
            <div className="font-medium text-sm leading-none">預覽圖片</div>
            <img src={preview} alt="preview" className="rounded-lg" />
          </div>}
          <div className="text-right">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </>
  )
}