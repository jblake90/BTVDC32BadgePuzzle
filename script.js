"use strict";

document.addEventListener('DOMContentLoaded', function() {
    const terminal = document.getElementById('terminal');
    const terminalInput = document.createElement('input');
    terminalInput.setAttribute('type', 'text');
    terminal.appendChild(terminalInput);
    terminalInput.focus();

    let currentPath = '/';
    let hasDecoderTool = false;
    let hasHiddenKey = false;

    const fileSystem = {
        '/': ['README.txt', 'Chiba_City', 'Sprawl', 'Orbit', 'Cyberspace_Depths'],
        '/Chiba_City': ['Ratz_Bar.txt', 'clinic', 'cybernetics_shop'],
        '/Chiba_City/clinic': ['note_from_Molly.txt'],
        '/Chiba_City/cybernetics_shop': ['encrypted_message.txt', 'decoder_tool.txt', 'hidden_key.txt'],
        '/Sprawl': ['Straylight', 'Tessier-Ashpool'],
        '/Sprawl/Straylight': ['Wintermute.txt'],
        '/Sprawl/Tessier-Ashpool': ['AI_core', '3Jane_diary.txt', 'AI_message.txt'],
        '/Orbit': ['Freeside', 'Zion'],
        '/Orbit/Freeside': ['Club_Bela.txt', 'note_from_Riviera.txt'],
        '/Orbit/Zion': ['message_from_Maelcum.txt'],
        '/Cyberspace_Depths': ['fragment1.txt', 'fragment2.txt', 'final_unlocked_message.txt'],
    };

    const fileContents = {
        '/README.txt': 'Welcome, Console Cowboy, to the Cyberspace puzzle...',
        '/Chiba_City/Ratz_Bar.txt': 'A dingy bar filled with the echoes of past conversations...',
        '/Chiba_City/clinic/note_from_Molly.txt': 'Molly\'s handwriting urges you to dive deeper into the Sprawl to find Wintermute.',
        '/Chiba_City/cybernetics_shop/encrypted_message.txt': 'An encrypted message gleams on the screen, hinting at a decoder tool nearby...',
        '/Chiba_City/cybernetics_shop/decoder_tool.txt': 'This tool promises to decipher secrets, if paired with the right key...',
        '/Chiba_City/cybernetics_shop/hidden_key.txt': 'A small, unassuming key that complements the decoder tool, waiting to unlock truths...',
        '/Sprawl/Straylight/Wintermute.txt': 'Pages of dense code, part of Wintermute\'s consciousness, spread out before you...',
        '/Sprawl/Tessier-Ashpool/AI_core/AI_message.txt': 'The encrypted core of the AI\'s message beckons to be decoded, containing the essence of the AI\'s desires...',
        '/Orbit/Freeside/Club_Bela.txt': 'The club\'s neon lights flicker, hiding secrets in plain sight, including a note left in haste by Riviera...',
        '/Orbit/Zion/message_from_Maelcum.txt': 'Maelcum\'s deep, resonant voice echoes through his words, guiding you towards the Cyberspace Depths for the final key...',
        '/Cyberspace_Depths/final_unlocked_message.txt': 'This file remains locked, its contents a mystery. Perhaps the AI message holds the clue to unlocking it...',
    };

    terminalInput.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            processCommand(terminalInput.value.trim());
            terminalInput.value = ''; // Clear input after processing
        }
    });

    function appendToTerminal(text) {
        const line = document.createElement('div');
        line.textContent = text;
        terminal.insertBefore(line, terminalInput);
        terminal.scrollTop = terminal.scrollHeight; // Auto-scroll
    }

    function processCommand(input) {
        const [command, arg] = input.split(' ');
        switch (command) {
            case 'ls':
                appendToTerminal(ls(currentPath));
                break;
            case 'cd':
                const cdResult = cd(arg);
                if (cdResult) appendToTerminal(`Now in ${currentPath}`);
                else appendToTerminal('Directory not found');
                break;
            case 'cat':
                appendToTerminal(cat(arg));
                break;
            case 'decode':
                appendToTerminal(decode(arg));
                break;
            case 'hack':
                appendToTerminal(hack(arg));
                break;
            case 'use':
                appendToTerminal(use(arg));
                break;
            case 'clear':
                clearTerminal();
                break;
            default:
                appendToTerminal(`${command}: command not found`);
                break;
        }
    }

    function ls(path) {
        return fileSystem[path]?.join('\n') || '';
    }

    function cd(directory) {
        const newPath = directory === '/' ? directory : `${currentPath}/${directory}`.replace('//', '/');
        if (fileSystem[newPath]) {
            currentPath = newPath;
            return true;
        }
        return false;
    }

    function cat(filename) {
        const filePath = `${currentPath}/${filename}`.replace('//', '/');
        return fileContents[filePath] || 'File not found';
    }

    function decode(filename) {
        if (filename === 'final_unlocked_message.txt' && currentPath.includes('/Cyberspace_Depths') && hasDecoderTool && hasHiddenKey) {
            displayFinalMessage('Decoded message: "The secret to the universe is 42." Congratulations on solving the puzzle!');
            return ''; // The message display is handled by displayFinalMessage
        }
        return 'File not found or cannot be decoded without the decoder tool and hidden key.';
    }

    function hack(target) {
        if (target === 'AI_core' && currentPath.includes('/Sprawl/Tessier-Ashpool')) {
            hasDecoderTool = true;
            return 'Hacking successful. Decoder tool acquired.';
        }
        return 'Hacking attempt failed.';
    }

    function use(item) {
        if (item === 'decoder_tool.txt' && hasDecoderTool) {
            return 'Using the decoder tool. Now find and decode the final message with the hidden key.';
        } else if (item === 'hidden_key.txt' && currentPath.includes('/Chiba_City/cybernetics_shop')) {
            hasHiddenKey = true;
            return 'Hidden key acquired. Now decode the final message with the decoder tool.';
        }
        return `Cannot use ${item}.`;
    }
    function clearTerminal() {
    // First, remove all child nodes except the input field.
        while (terminal.firstChild && terminal.removeChild(terminal.firstChild) !== terminalInput) {
            terminal.removeChild(terminal.firstChild);
        }

    // Ensure the input field is the last child of the terminal.
    // This step might be redundant if the input is always appended last,
    // but it guarantees the correct structure after clearing.
        if (terminal.lastChild !== terminalInput) {
            terminal.appendChild(terminalInput);
        }

        terminalInput.value = ''; // Optionally clear the current input value.
        terminalInput.focus(); // Bring focus back to the input field.
    }

    function displayFinalMessage(message) {
        terminal.innerHTML = ''; // Clear the terminal for the final message
        let i = 0;
        const speed = 50; // Speed in milliseconds
        function typeWriter() {
            if (i < message.length) {
                terminal.innerHTML += message.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        typeWriter();
    }
});
