---
title: "Lessons Learned on the Hidden Bloat of AI and ML Tech"
author: rajah@cobaltcounsel.com
tags: ["Technology","Future of Work"]
date: 2020-05-26
description: "Whether it’s an image recognition app, a fraud detection app or many of the possible use cases for AI or ML, when picturing the “robots” that will be replacing jobs and changing industries, it’s the leanest and fittest that will survive."
---


Whether it’s an image recognition app, a fraud detection app or many of the possible use cases for AI or ML, when picturing the “robots” that will be replacing jobs and changing industries, it’s the leanest and fittest that will survive.

An article published by Andreessen Horowitz circulated through our office earlier this year. The article, entitled *[The New Business of AI (and How It’s Different From Traditional Software)](https://a16z.com/2020/02/16/the-new-business-of-ai-and-how-its-different-from-traditional-software/)* and written by Martin Casado and Matt Bornstein on behalf of Horowitz, critiqued the profitability of creating AI companies and discussed the unexpected bloated reality of many AI and ML products.

**A Complex ML model: Simulating a Lawyer’s Brain**

The article discusses how an ML/AI business differs from a traditional SaaS business in terms of the operating costs required. Specifically, Horowitz discusses the characteristics that AI companies have that are similar to traditional service companies: lower gross margins, scaling challenges and weaker defensive moats. Horowitz argues that the lower gross margins are due to the resources spent on cloud operations and AI models which must continuously be retrained. Horowitz also talks about the costs of running software which must be paid by the company itself rather than the buyer or the client, which is another cost associated with AI companies. 

No arguments from us, it’s common for our team members to look at each other and ask: why are we trying to solve such a complex problem? In our case, we set out to, piece-by-piece, use our software to simulate a lawyer’s brain, by processing inbound documents to assist in legal document review. Sunk costs, refusal to fail, stubbornness and wilful blindness have led us to these pioneering lessons:

**Be ready to spend money on people:** Along this road, we’ve encountered a lot of “mechanical turks” - companies professing AI that are only semi-automated, and are supplemented by human review. The human intervention required to confirm that the work product is correct is widespread in the industry and is extremely expensive. From our own experience, and as the article has noted, gross margins differ for AI/ML companies from traditional SaaS, because of the level of human quality control required in our very own legal document review.

**Be prepared to pivot towards spending even more money on people:** Most software companies form the desire to solve a problem with a system that avoids people interaction, in favor of automatic processing. Decisions on how to structure the workflow to optimize the “wins” related to the data processing has been essential for us, due to the complexity of the problem, and the resulting (and over bloated) need for quality control, an overabundance of “edge cases” (as described in the article) or strange problems that don’t fit the typical process. **As an example related to workflow**, we set out to “dock” the text results received through the  machine learning processes, in a location that made human review easy to perform, thereby limiting the potential for machine error, limiting the potential for human error and enabling us to proceed with mass processing without getting stuck. So it’s therefore possible for our services team to quickly turn around a document review - which, as pointed out by the article, means that for us, we’re presently not able to decouple our ML process from a services team.

**Be prepared to overspend on processing costs.** The article describes the shrinking gross margins that would result from pure processing alone. In our case, picture a contract review as a process that bursts a contract into 500 individual fragments of knowledge capture, with an additional 25 to 50 fragments of knowledge from the second version, and so on ...and on...and on. The number of processes and bits of data grows exponentially, and to process that growing pool places a heavy load on bandwidth and processing tools. Many ML and AI companies face this, and up-front investment in **end-user browser-based processing**, and **client-based data hosting**, was a wise decision made by our CTO.

**Be in love with the problem you’re solving.** ML and AI tasks, by their nature, are thinking tasks that require learning. Up against these obstacles, we know that **automating legal document review is *our* problem to solve**. We embrace our services team and they embrace our automations. Without a deep desire to solve this problem and without the curiosity and willingness of our services team to wade through versions, pivots and iterations, this already hard road would be impossible to travel.

**Be patient, and convince your investors and customers to be patient.** One seldom pictures ML or AI as a bloated and slow-moving robot huffing and puffing, trying hard to keep up with its human counterparts, or other software competitors. Of course, you’ll have to decide: Is the extra “bloat” worth it? With some patience and some pivots, we’ve discovered that our customers value the business solution (fast, affordable document review) more so than how we got there (i.e. the emphasis on software versus services), so as the article has pointed out, a good business model is the most important thing.

Hope that helps,

Rajah
