<div align="center">
<img width="50%" src="https://user-images.githubusercontent.com/39925779/185620144-eed19800-0b79-40f5-8c0f-c11d80b1e0fb.svg" alt="Logo"/>
<h3>Instantly download your favorite videos from Twitter</h3>
 </div>
 
<hr/>

## How to use it

### 1. Web Interface

Use the stupidly simple web interface to get the raw video link of any Tweet URL.

![Web Interface screenshot](https://user-images.githubusercontent.com/39925779/185625338-824d8289-82ec-4047-b791-6542bd806b04.png)

### 2. Auto Redirect

Append the Tweet to the base URL to get instantly redirected to its video.  
Example: `https://tdl.nander.dev/https://twitter.com/i/status/1560616735748698114`

## How it works

TDL uses the [Twitter v1.1 API](https://developer.twitter.com/en/docs/twitter-api/v1) to search a Tweet and extract the video information.  
Everything is written in [TypeScript](https://www.typescriptlang.org/) and runs on the [Deno Runtime](https://deno.land) with support for [Deno Deploy](https://deno.com/deploy).

## How to deploy it yourself

### Requirements
| Software | Version |
| --------------- | --------------- |
| Deno | 1.24.3 or higher |

### Setting up environment

1. Copy the `.env.example` file to `.env.prod` (don't delete `.env.example`, it will be used for validation)
2. Enter your Twitter API Bearer Token in TWITTER_BEARER ([here's how to get one](https://developer.twitter.com/en/docs/twitter-api/getting-started/getting-access-to-the-twitter-api))
3. Enter a port in PORT (setting PORT to `0` will allow the operating system to select the port)

### Starting
```sh
deno task start
```
