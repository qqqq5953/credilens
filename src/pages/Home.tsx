import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
import { Plus } from 'lucide-react';

import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowDownWideNarrow } from 'lucide-react';
import { ArrowUpNarrowWide } from 'lucide-react';
import { useState } from "react";

export default function Home() {
  const [isDscending, setIsDscending] = useState(true)

  const data = [
    {
      "id": 123,
      "cardName": "賴點卡",
      "bank": "聯邦銀行",
      "cashback": 2,
      "cashbackForChannelType": 1,
      "channelType": [
        "網購",
        "交通"
      ],
      "tags": [
        "外送",
        "網購",
        "內送",
        "網購1"
      ],
      "image": "https://images.contentstack.io/v3/assets/blt4ca32b8be67c85f8/bltfe59cedb2a464fde/613b20d851f9bb3aa35e5cab/Fotoram.io_(6).png?width=256&disable=upscale&fit=bounds&auto=webp"
    },
    {
      "id": 234,
      "cardName": "iLeo",
      "bank": "第一銀行",
      "cashback": 3,
      "cashbackForChannelType": 1,
      "channelType": [
        "網購",
        "交通"
      ],
      "tags": [
        "外送",
        "網購"
      ],
      "image": "https://images.contentstack.io/v3/assets/blt4ca32b8be67c85f8/bltcdc5574c3ddf309c/60486ab75aedc043351b729a/iLeo-3.jpeg?width=256&disable=upscale&fit=bounds&auto=webp"
    }
  ].sort((a, b) => {
    if (isDscending) {
      return (b.cashback + b.cashbackForChannelType) - (a.cashback + a.cashbackForChannelType)
    } else {
      return (a.cashback + a.cashbackForChannelType) - (b.cashback + b.cashbackForChannelType)
    }
  })

  const data1 = localStorage.getItem('data') != null ? [
    JSON.parse(localStorage.getItem('data')!)
  ] : data

  const cashbackOnChannelType = [
    { label: '全部', value: '全部' },
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

  function handleChange(value: string) {
    console.log('value', value);
  }




  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Select onValueChange={handleChange} defaultValue={cashbackOnChannelType[0].value}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="篩選類別" />
            </SelectTrigger>
            <SelectContent>
              {cashbackOnChannelType.map(type => {
                return <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
              })}
            </SelectContent>
          </Select>
          <Button variant="outline" className="text-neutral-600" onClick={() => setIsDscending(!isDscending)}>
            {isDscending ?
              <ArrowDownWideNarrow /> :
              <ArrowUpNarrowWide />
            }
          </Button>
        </div>
        <Button variant="ghost">
          <Link to="/edit"><Plus /></Link>
        </Button>
      </div>

      <section className="flex flex-col gap-6 py-4">
        {data.map(card => {
          return <Card className="relative overflow-hidden
          bg-neutral-50
          shadow rounded-3xl text-neutral-700"
            key={card.id}>
            <CardHeader className="space-y-2 pb-4">
              <CardTitle>{card.cardName}</CardTitle>
              <div className="flex flex-wrap gap-1 w-4/5">
                {card.tags.map((tag: string) => {
                  return <Badge key={tag} className="bg-gray-100 text-neutral-700 font-normal shadow">{tag}</Badge>
                })}
              </div>
              <div className="absolute top-2 right-6 text-5xl font-semibold text-blue-600">{card.cashback + card.cashbackForChannelType}%</div>
            </CardHeader>

            <CardContent className="">
              <div className="flex justify-between">
                <ul className="mt-3 space-y-1">
                  <li className="space-y-2">
                    <span>現金回饋: </span>
                    <span>{card.cashback}%</span>
                  </li>
                  <li className="space-y-2">
                    <span>指定回饋: </span>
                    <span>{card.cashbackForChannelType}%</span>
                    <div className="flex items-center gap-1">
                      <span>回饋通路: </span>
                      {card.channelType.map((tag: string) => {
                        return <Badge key={tag}
                          className="bg-transparent border border-neutral-300 text-neutral-500 font-normal">{tag}</Badge>
                      })}
                    </div>
                  </li>
                </ul>

              </div>
            </CardContent>
            <CardFooter className="w-full justify-between text-neutral-400 text-sm">
              {card.bank}
              <div className="w-10 aspect-[5/3]">
                <img
                  src={card.image}
                  className="block object-cover w-full"
                />
              </div>
            </CardFooter>
          </Card>
        })}
      </section>

      {/* <div className="flex flex-col gap-6 py-4">
        {data.map(card => {
          return <Card className="relative overflow-hidden
          bg-neutral-50
          shadow rounded-3xl text-neutral-700"
            key={card.id}>
            <CardHeader className="space-y-2 py-4">
              <div className="flex gap-2 items-baseline">
                <h3 className="text-xl font-semibold">{card.cardName}</h3>
                <div className="flex items-center gap-2 ml-auto">
                  <div className="w-10 aspect-[5/3]">
                    <img
                      src={card.image}
                      className="block object-cover w-full"
                    />
                  </div>
                  <div className="text-3xl font-semibold">{card.cashback}%</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 w-3/5">
                {card.tags.map((tag: string) => {
                  return <Badge key={tag} className="bg-transparent border-indigo-600 text-indigo-600 font-normal">{tag}</Badge>
                })}
              </div>
            </CardHeader>

            <CardContent className="">
              <div className="flex justify-between">
                <ul className="mt-3 space-y-1">
                  <li className="space-y-2">
                    <span>指定回饋: </span>
                    <span>{card.cashbackForChannelType}%</span>
                    <div className="flex items-center gap-1">
                      <span>回饋通路: </span>
                      {card.channelType.map((tag: string) => {
                        return <Badge key={tag} className="bg-transparent bg-slate-100 text-neutral-700 font-normal">{tag}</Badge>
                      })}
                    </div>
                  </li>
                </ul>

              </div>
            </CardContent>
            <CardFooter className="w-full justify-end text-neutral-400 text-sm">
              {card.bank}
            </CardFooter>
          </Card>
        })}
      </div> */}

      {/* <div className="flex flex-col gap-6 py-4">
        {data.map(card => {
          return <Card className="relative overflow-hidden
          bg-neutral-50
          shadow rounded-3xl text-neutral-700"
            key={card.id}>
            <CardHeader className="space-y-2 pb-4">
              <CardTitle>{card.cardName}</CardTitle>
              <div className="flex flex-wrap gap-1 w-3/5">
                {card.tags.map((tag: string) => {
                  return <Badge key={tag} className="bg-transparent border-indigo-600 text-indigo-600 font-normal">{tag}</Badge>
                })}
              </div>
            </CardHeader>
            <div className="absolute top-4 right-4 w-2/5 aspect-[5/3]">
              <img
                src={card.image}
                className="block object-cover w-full"
              />
            </div>
            <CardContent className="">
              <ul className="mt-3 space-y-1">
                <li>
                  <span>現金回饋: </span>
                  <span>{card.cashback}%</span>
                </li>
                <li className="space-y-2">
                  <span>指定回饋: </span>
                  <span>{card.cashbackForChannelType}%</span>
                  <div className="flex items-center gap-1">
                    <span>回饋通路: </span>
                    {card.channelType.map((tag: string) => {
                      return <Badge key={tag} className="bg-transparent bg-slate-100 text-neutral-700 font-normal">{tag}</Badge>
                    })}
                  </div>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="w-full justify-end text-neutral-400 text-sm">
              {card.bank}
            </CardFooter>
          </Card>
        })}
      </div> */}

      {/* <div className="flex flex-col gap-6 py-4">
        {data.map(card => {
          return <Card className="relative overflow-hidden h-64 
          bg-neutral-100
          border-none shadow rounded-3xl text-neutral-700"
            key={card.id}>
            <CardHeader className="text-right">
              <CardTitle>{card.cardName}</CardTitle>
              <CardDescription>{card.bank}</CardDescription>
            </CardHeader>
            <img
              src={card.image}
              className="w-3/5 object-cover object-left absolute top-1/2 -translate-y-1/2 h-full"
              style={{
                WebkitMaskImage: "linear-gradient(90deg, #000, #50509d 20%, transparent)",
                maskImage: "linear-gradient(90deg, #000, #50509d 20%, transparent)"
              }}
            />
            <CardContent className="absolute right-0">
              <div className="flex gap-1 mt-1">
                {card.tags.map((tag: string) => {
                  return <Badge key={tag} className="bg-neutral-300">{tag}</Badge>
                })}
              </div>
              <ul className="mt-3 space-y-1">
                <li>
                  <span>現金回饋: </span>
                  <span>{card.cashback}%</span>
                </li>
                <li className="space-y-2">
                  <span>指定回饋: </span>
                  <span>{card.cashbackForChannelType}%</span>
                  <div className="flex items-center gap-1">
                    {card.channelType.map((tag: string) => {
                      return <Badge key={tag} variant="outline">{tag}</Badge>
                    })}
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        })}
      </div> */}

      {/* <div className="absolute w-1/2 h-full right-0 backdrop-blur-[4px] bg-white/10 rounded-r-2xl"></div> */}
      {/* <div className="flex flex-col gap-6 py-4">
        {data.map(card => {
          return <Card
            key={card.id}
            className="relative h-52 border-none rounded-3xl"
          >
            <img src={card.image} alt="" className="absolute inset-0 w-full h-full object-cover block rounded-sm"
              style={{
                WebkitMaskImage: "linear-gradient(90deg, #000, #50509d 40%, transparent 120%)",
                maskImage: "linear-gradient(90deg, #000, #50509d 40%, transparent 120%)"
              }}
            />
            <div className="absolute w-1/2 h-full right-0 p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{card.cardName}</h2>
                <h3 className="text-sm text-neutral-500">{card.bank}</h3>
              </div>
              <div className="flex gap-1 mt-1">
                {card.tags.map((tag: string) => {
                  return <Badge key={tag}>{tag}</Badge>
                })}
              </div>
              <ul className="mt-3 space-y-1">
                <li>
                  <span>現金回饋: </span>
                  <span>{card.cashback}%</span>
                </li>
                <li className="space-y-2">
                  <span>指定回饋: </span>
                  <span>{card.cashbackForChannelType}%</span>
                  <div className="flex items-center gap-1">
                    {card.channelType.map((tag: string) => {
                      return <Badge key={tag} variant="outline">{tag}</Badge>
                    })}
                  </div>
                </li>
              </ul>
            </div>
          </Card>
        })}
      </div> */}
    </>
  )
}
