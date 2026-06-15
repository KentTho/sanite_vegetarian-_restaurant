---
layout: Conceptual
title: Agents - .NET | Microsoft Learn
canonicalUrl: https://learn.microsoft.com/en-us/dotnet/ai/conceptual/agents
apiPlatform: dotnet
author: luisquintanilla
breadcrumb_path: /dotnet/breadcrumb/toc.json
feedback_system: OpenSource
feedback_product_url: https://aka.ms/feedback/report?space=61
ms.author: luquinta
ms.devlang: dotnet
ms.service: dotnet
ms.topic: concept-article
show_latex: true
uhfHeaderId: MSDocsHeader-DotNet
ms.subservice: intelligent-apps
ms.collection: ce-skilling-ai-copilot
ms.custom: devx-track-dotnet
ms.update-cycle: 180-days
description: Introduction to agents
ms.date: 2025-12-10T00:00:00.0000000Z
locale: en-us
document_id: 18300717-56cf-64fd-e74f-f5ad8c04b983
document_version_independent_id: f218f8c8-f8bb-7566-1567-459a380713e6
updated_at: 2025-12-12T08:19:00.0000000Z
original_content_git_url: https://github.com/dotnet/docs/blob/live/docs/ai/conceptual/agents.md
gitcommit: https://github.com/dotnet/docs/blob/73e09f56f601b97c90d961d783e01190f016e272/docs/ai/conceptual/agents.md
git_commit_id: 73e09f56f601b97c90d961d783e01190f016e272
site_name: Docs
depot_name: VS.core-docs
page_type: conceptual
toc_rel: ../toc.json
pdf_url_template: https://learn.microsoft.com/pdfstore/en-us/VS.core-docs/{branchName}{pdfName}
feedback_help_link_type: ''
feedback_help_link_url: ''
search.mshattr.devlang: csharp
word_count: 384
asset_id: ai/conceptual/agents
moniker_range_name: 
monikers: []
item_type: Content
source_path: docs/ai/conceptual/agents.md
cmProducts:
- https://authoring-docs-microsoft.poolparty.biz/devrel/7696cda6-0510-47f6-8302-71bb5d2e28cf
spProducts:
- https://authoring-docs-microsoft.poolparty.biz/devrel/69c76c32-967e-4c65-b89a-74cc527db725
platformId: 60d7d03a-2b1f-421b-4bd5-7639cff6c01e
---

# Agents - .NET | Microsoft Learn

This article introduces the core concepts behind agents, why they matter, and how they fit into workflows, setting you up to get started building agents in .NET.

## What are agents?

**Agents are systems that accomplish objectives.**

![Components of an agent](../media/agents/agent-components.png)

Agents become more capable when equipped with the following:

- **Reasoning and decision-making**: Powered by LLMs, search algorithms, or planning and decision-making systems.
- **Tool usage**: Access to Model Context Protocol (MCP) servers, code execution, and external APIs.
- **Context awareness**: Informed by chat history, threads, vector stores, enterprise data, or knowledge graphs.

These capabilities allow agents to operate more autonomously, adaptively, and intelligently.

## What are workflows?

As objectives grow in complexity, they need to be broken down into manageable steps. That's where workflows come in.

**Workflows define the sequence of steps required to achieve an objective.**

Imagine you're launching a new feature on your business website. If it's a simple update, you might go from idea to production in a few hours. But for more complex initiatives, the process might include:

- Requirement gathering
- Design and architecture
- Implementation
- Testing
- Deployment

A few important observations:

- Each step might contain subtasks.
- Different specialists might own different phases.
- Progress isn’t always linear. Bugs found during testing might send you back to implementation.
- Success depends on planning, orchestration, and communication across stakeholders.

### Agents + workflows = agentic workflows

Workflows don't require agents, but agents can supercharge them.

When agents are equipped with reasoning, tools, and context, they can optimize workflows.

This is the foundation of multi-agent systems, where agents collaborate within workflows to achieve complex goals.

### Workflow orchestration

Agentic workflows can be orchestrated in a variety of ways. The following are a few of the most common:

- Sequential
- Concurrent
- Handoff
- Group chat
- Magentic

#### Sequential

Agents process tasks one after another, passing results forward.

![Sequential agent orchestration: Task Input → Agent A → Agent B → Agent C → Final Output](../media/agents/sequential-workflow.png)

#### Concurrent

Agents work in parallel, each handling different aspects of the task.

![Concurrent agent orchestration: Task Input → Agents A, B, C → Aggregate Results → Final Output](../media/agents/concurrent-workflow.png)

#### Handoff

Responsibility shifts from one agent to another based on conditions or outcomes.

![Handoff orchestration: Task Input → Agent A Decision → Agent B or Agent A → Agent B Decision → Agent C or Agent B → Final Output](../media/agents/handoff-workflow.png)

#### Group chat

Agents collaborate in a shared conversation, exchanging insights in real-time.

![Group chat orchestration: User and Agents A, B, C collaborate via GroupChat to produce final output](../media/agents/groupchat-workflow.png)

#### Magentic

A lead agent directs other agents.

## How can I get started building agents in .NET?

The building blocks in [Microsoft.Extensions.AI](/en-us/dotnet/api/microsoft.extensions.ai) and [Microsoft.Extensions.VectorData](/en-us/dotnet/api/microsoft.extensions.vectordata) supply the foundations for agents by providing modular components for AI models, tools, and data.

These components serve as the foundation for Microsoft Agent Framework. For more information, see [Microsoft Agent Framework](/en-us/agent-framework/overview/agent-framework-overview).