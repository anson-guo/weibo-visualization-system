# coding:utf-8
import re
import requests
import time
import pymongo
import json
import jsonpath
import datetime

myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017/")



def get_fieid(text,comp_str):
    # "profile_image_url":"(.*?)"
    comp_str = r'{}'.format(comp_str)
    fieid =  re.findall(comp_str,text,re.DOTALL)
    # 转换unicode编码
    fieid = [word.encode().decode("unicode_escape") for word in fieid]
    # 除去‘\\’
    fieid = [word.replace("\\","") for word in fieid]
    if len(fieid) == 0:
        fieid.append(None)
    return fieid
# 转换时间
def parse_time(date):
    if re.match(r'刚刚', date):
        date = time.strftime('%Y-%m-%d', time.localtime(time.time()))
        # date = time.strftime('%Y-%m-%d %H:%M', time.localtime(time.time()))

    if re.match(r'\d+分钟前', date):
        minute = re.match(r'(\d+)', date).group(1)
        date = time.strftime('%Y-%m-%d', time.localtime(time.time() - float(minute) * 60))
    if re.match(r'\d+小时前', date):
        hour = re.match(r'(\d+)', date).group(1)
        date = time.strftime('%Y-%m-%d', time.localtime(time.time() - float(hour) * 60 * 60))
    if re.match(r'昨天.*', date):
        date = time.strftime('%Y-%m-%d', time.localtime(time.time() - 24 * 60 * 60))
    if re.match(r'\d{2}-\d{2}', date):
        date = time.strftime('%Y-', time.localtime()) + date
    return date



headers = {
    "User_Agent":"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebkit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.62 Safari/537.36"
}
# user info 
def scapy_page1(uid):
    base_url = 'https://m.weibo.cn/api/container/getIndex?uid={0}&type=uid&value={0}&containerid=100505{0}'
    url = base_url.format(uid)
    print(url)
    response = requests.get(url,headers=headers)
    code = response.status_code
    if code != 200:
        print("error:",url)
        return
    text = response.text
    user_info = json.loads(text)
    userInfo = user_info["data"]["userInfo"]
    
    user = {}
    user["_id"] = userInfo["id"]
    user["avatar"] = userInfo["profile_image_url"]
    user["cover"] = userInfo["cover_image_phone"]
    user["description"] = userInfo["description"]
    user["crawled_at"] = time.strftime('%Y-%m-%d %H:%M ',time.localtime(time.time()))
    user["fans_count"] = userInfo["followers_count"]
    user["follows_count"] = userInfo["follow_count"]
    user["gender"] = userInfo["gender"]
    user["name"] = userInfo["screen_name"]
    user["verified"] = userInfo["verified"]
    if "verified_reson" in userInfo:
        user["verified_reason"] =  userInfo["verified_reason"]
    else:
        user["verified_reason"] = None 

    user["verified_type"] =  userInfo["verified_type"]
    user["weibos_count"] =  userInfo["statuses_count"]
    user["fans"] = []
    user["follows"] = []
    return user

# fans info 
def scapy_page2(uid,page,url):
    base_url = url
    url = base_url.format(uid, page)
    print(url)
    response = requests.get(url,headers=headers)
    code = response.status_code
    if code != 200:
        print("error:",url)
        return
    text = response.text
    fans_info = json.loads(text)

    if len(fans_info["data"]["cards"]) != 0:
        for i in range(len(fans_info["data"]["cards"])):
            card_groups = fans_info["data"]["cards"][i]["card_group"]
            print("fans number is ",  len(card_groups))
            fans = []
            for card_group in card_groups:
                fan = {}
                if "user" not in card_group:
                    continue
                fan["id"] = card_group["user"]["id"]
                fan["followers_count"] = card_group["user"]["followers_count"]
                fan["follow_count"] = card_group["user"]["follow_count"]
                if "gender" in card_group:
                    fan["gender"] = card_group["gender"]
                else:
                    fan["gender"] = None
                fan["name"] = card_group["user"]["screen_name"]
                fan["verified"] = card_group["user"]["verified"]
                fan["verified_type"] = card_group["user"]["verified_type"]
                fans.append(fan)
        return fans
    else:
        
        return "over"

# weibo info 
def scapy_page4(uid,page):
    base_url = 'https://m.weibo.cn/api/container/getIndex?uid={0}&type=uid&page={1}&containerid=107603{0}'
    url = base_url.format(uid, page)
    print(url)
    response = requests.get(url,headers=headers)
    code = response.status_code
    if code != 200:
        print("error:",url)
        return
    text = response.text
    weibo_info = json.loads(text)
    if len(weibo_info["data"]["cards"]) != 0:
        cards = weibo_info["data"]["cards"]
        weibos = []
        for i in range(len(weibo_info["data"]["cards"])):

            weibo = {}
            if "mblog" not in cards[i]:
                continue
            
            weibo["_id"] = cards[i]["mblog"]["id"]
            weibo["attitudes_count"] = cards[i]["mblog"]["attitudes_count"]
            weibo["comments_count"] = cards[i]["mblog"]["comments_count"]
            weibo["crawled_at"] = time.strftime('%Y-%m-%d %H:%M ',time.localtime(time.time()))
            weibo["created_at"] = parse_time(cards[i]["mblog"]["created_at"])
            if "pics" in cards[i]["mblog"]:

                weibo["pictures"] = [word["url"] for word in cards[i]["mblog"]["pics"]]
            else:
                weibo["pictures"] = None
            weibo["reposts_count"] = cards[i]["mblog"]["reposts_count"]
            weibo["source"] = cards[i]["mblog"]["source"]
            weibo["text"] = cards[i]["mblog"]["text"]
            weibo["user"] = cards[i]["mblog"]["user"]["id"]
            if "page_info" in cards[i]["mblog"]:
                weibo["position"] = cards[i]["mblog"]["page_info"]["page_title"]
            else:
                weibo["position"] = None
            weibos.append(weibo)
        return weibos
    else:
        print("url",url)
        print(len(weibo_info["data"]["cards"]))
        print(weibo_info["data"]["cards"])
        print("code",code)
        print("text",text)
        return "over" 
    
if __name__ == '__main__':
    import sys
    uid = sys.argv[1]
    starttime = datetime.datetime.now()
    mydb = myclient["weibo02"]
    mycol = mydb["user"]

    user = scapy_page1(uid)
    
    myquery = {}
    myquery["_id"] = int(uid)
    # 判断原来是否有该用户
    myfind = mycol.find(myquery)
    is_existence = []
    for x in myfind:
        print("--------")
        is_existence.append(x)
    print(len(is_existence))
    # 若有，len(is_existence) != 0
    if len(is_existence) == 0:
        user_result = mycol.insert_one(user)
        print("add")
    # print(user_result)
    # 添加粉丝
    fans_not_null = True
    page = 1
    while fans_not_null:
        newfans = scapy_page2(uid,page,'https://m.weibo.cn/api/container/getIndex?containerid=231051_-_fans_-_{0}&since_id={1}')
        if newfans == "over":
            fans_not_null = False
            print("over")
        else:
            # 查询要添加的_id
            myfind = mycol.find(myquery)
            oldfollows = []
            for x in myfind:
                oldfollows = x["fans"]
            if len(oldfollows) != 0:
                if newfans[0] not in oldfollows:
                    newfans.extend(oldfollows)
                else:
                    fans_not_null = False
                    continue
            fans_dict = {}
            fans_dict["fans"] = newfans
            newvalues = {}
            newvalues["$set"]= fans_dict
            # print(newvalues)
            mycol.update_one(myquery,newvalues)
            page += 1
    # 添加关注
    follows_not_null = True
    page = 1
    while follows_not_null:
        newfollows = scapy_page2(uid,page,'https://m.weibo.cn/api/container/getIndex?containerid=231051_-_followers_-_{0}&page={1}')
        if newfollows == "over":
            follows_not_null = False
            print("over")
        else:
            # 查询要添加的_id
            myfind = mycol.find(myquery)
            oldfollows = []
            for x in myfind:
                oldfollows = x["follows"]

            if len(oldfollows) != 0:
                if newfollows[0] not in oldfollows:
                    newfollows.extend(oldfollows)
                else:
                    follows_not_null = False
                    continue
            follows_dict = {}
            follows_dict["follows"] = newfollows
            newvalues = {}
            newvalues["$set"]= follows_dict
            # print(newvalues)
            mycol.update_one(myquery,newvalues)
            page += 1

    # 添加关注
    mydb = myclient["weibo02"]
    mycol = mydb["weibos"]
    
    weibos_not_null = True
    page = 1
    while weibos_not_null:
        newweibos = scapy_page4(uid,page)
        if newweibos == "over":
            weibos_not_null = False
            print("over")
        else:
            print(len(newweibos))
            for newweibo in newweibos:
                # 查询要添加的_id
                myquery = {}
                myquery["_id"] = newweibo["_id"]
                myfind = mycol.find(myquery)
                weibos = []
                for x in myfind:
                    weibos = x["_id"]
                if len(weibos) == 0:
                    user_result = mycol.insert_one(newweibo)

            page += 1
    endtime = datetime.datetime.now()
    print(endtime-starttime)
    # scapy_page4(uid,1)
    # scapy_page3(25739)