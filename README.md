# 🦀 Rust & Minecraft Bot: A Learning Journey

<p align="center">
  <img src="https://rustacean.net/assets/rustacean-flat-happy.svg" width="150" alt="Rustacean mascot Ferris">
</p>

<p align="center">
  <strong>A 12-week project to learn the Rust programming language from scratch by building a functional Minecraft bot.</strong>
  <br />
  This repository documents the entire journey, from "Hello, World!" to a fully asynchronous, protocol-aware client.
</p>

---

## 📍 About This Project

This repository is more than just a collection of code; it's a structured, real-time chronicle of learning Rust. The primary goal is to master core Rust concepts by applying them to a challenging and fun domain: creating a bot for Minecraft.

The project is organized as a **Cargo Workspace**, allowing for multiple, interconnected crates that represent different stages of learning. Each phase builds upon the last, culminating in the final bot implementation.

## 🚀 Current Status

**Status:** ⏳ **Phase 1: Rust Fundamentals**

*Last updated: June 23, 2025*

## 🗺️ Project Roadmap

This repository is structured as a monorepo, with each phase of the learning plan located in its own directory.

| Phase | Title | Status | Key Deliverable |
| :---: | :--- | :--- | :--- |
| **[Phase 1](./phase-01-fundamentals/)** | Rust Fundamentals | ⏳ **In Progress** | `RPG Simulator` |
| **[Phase 2](./phase-02-basic-networking/)** | Basic Networking | 🔜 To Do | `Multi-Client Chat Server` |
| **[Phase 3](./phase-03-binary-protocols/)** | Binary Protocols | 🔜 To Do | `DNS Client` |
| **[Phase 4](./phase-04-async/)** | Async Programming | 🔜 To Do | `Async Game Server` |
| **[Phase 5](./phase-05-minecraft-protocol/)** | Minecraft Protocol Study | 🔜 To Do | `Packet Framework` |
| **[Phase 6](./phase-06-bot-implementation/)** | Bot Implementation | 🔜 To Do | `Functional Minecraft Bot` |

> For a day-by-day breakdown of tasks and goals, see the **[Full 12-Week Plan](./docs/PLAN.md)**.

---

## 🛠️ Key Skills & Technologies

This project is designed to provide hands-on experience with a wide range of essential software engineering concepts:

* **Rust Language Mastery:** Ownership, Borrowing, Lifetimes, Error Handling, Traits, Generics, and Macros.
* **Concurrent & Asynchronous Programming:** Managing threads and building high-performance, non-blocking applications with `tokio`.
* **Low-Level Network Programming:** Working directly with TCP sockets and understanding data flow.
* **Binary Protocol Parsing:** Serializing and deserializing complex, variable-length binary data packets—a critical skill for game development and systems programming.
* **API & Library Design:** Structuring code into reusable libraries (`crates`) within a project.
* **Testing:** Writing robust unit and integration tests to ensure code quality and correctness.
* **Project Management:** Using `git` for version control and `Cargo Workspaces` to manage a multi-package monorepo.

## ⚙️ How to Use This Repository

This project is configured as a Cargo Workspace. To work with the code:

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd <your-repo-name>
    ```

2.  **Build all projects at once:**
    ```bash
    cargo build
    ```
    This command uses the shared `target` directory at the root, saving significant time and disk space.

3.  **Run a specific project:**
    Use the `-p` or `--package` flag to specify which crate to run. For example, to run the CLI calculator from Phase 1:
    ```bash
    cargo run -p calculadora-cli
    ```

4.  **Run all tests:**
    ```bash
    cargo test --all
    ```

---

## 🏆 Project Milestones

These are the major deliverables that mark the completion of each significant stage of learning.

-   [ ] **Checkpoint 1 (Week 3):** Functional RPG Simulator demonstrating mastery of Rust fundamentals.
-   [ ] **Checkpoint 2 (Week 5):** Multi-client TCP chat server demonstrating concurrency concepts.
-   [ ] **Checkpoint 3 (Week 7):** DNS client capable of resolving domains, proving mastery of binary protocols.
-   [ ] **Checkpoint 4 (Week 9):** An asynchronous game server built with Tokio.
-   [ ] **Checkpoint 5 (Week 10):** A robust framework for serializing and deserializing Minecraft packets.
-   [ ] **Final Deliverable (Week 12):** A fully functional Minecraft bot that can connect, log in, and interact with a server.

