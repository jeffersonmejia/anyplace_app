# FUNCTION TO SELECT COMMIT TYPE
function Select-CommitType {
    Write-Host "`n[MENU] Select commit type:" -ForegroundColor Cyan
    Write-Host "1. feat     -> New feature" -ForegroundColor Green
    Write-Host "2. fix      -> Bug fix" -ForegroundColor Red
    Write-Host "3. docs     -> Documentation changes" -ForegroundColor Yellow
    Write-Host "4. style    -> Code style changes" -ForegroundColor Magenta
    Write-Host "5. refactor -> Code refactoring" -ForegroundColor Cyan
    Write-Host "6. test     -> Adding or updating tests" -ForegroundColor Blue
    Write-Host "7. chore    -> Other changes (build, dependencies, etc.)" -ForegroundColor White

    $typeChoice = Read-Host "Enter your choice (1-7)"

    switch ($typeChoice) {
        "1" { return "feat" }
        "2" { return "fix" }
        "3" { return "docs" }
        "4" { return "style" }
        "5" { return "refactor" }
        "6" { return "test" }
        "7" { return "chore" }
        default {
            Write-Host "[ERROR] Invalid choice. Defaulting to 'chore'." -ForegroundColor Red
            return "chore"
        }
    }
}

# FUNCTION TO ASK USER IF THEY WANT TO DEPLOY
function Confirm-Deploy {
    Write-Host "`n[MENU] Do you want to commit and deploy?" -ForegroundColor Cyan
    Write-Host "1. Yes" -ForegroundColor Green
    Write-Host "2. No" -ForegroundColor Red

    $choice = Read-Host "Enter your choice (1 or 2)"
    return $choice
}

# FUNCTION TO PERFORM GIT OPERATIONS AND DEPLOY
function Commit-And-Deploy ($commitType, $msg) {
    Write-Host "`n[INFO] Adding changes..." -ForegroundColor Cyan
    git add .
    Write-Host "[INFO] Committing..." -ForegroundColor Cyan
    git commit -m "${commitType}: $msg"
    Write-Host "[INFO] Pulling latest changes..." -ForegroundColor Cyan
    git pull origin main
    Write-Host "[INFO] Pushing to repository..." -ForegroundColor Cyan
    git push origin main
    Write-Host "[INFO] Deploying..." -ForegroundColor Cyan
    npm run deploy
    Write-Host "[INFO] Commit and deploy completed." -ForegroundColor Green
}

# MAIN FUNCTION
function Main {
    cls

    # RUN BUILD FIRST
    Write-Host "`n[INFO] Running build..." -ForegroundColor Cyan
    npm run build

    # CONFIRM DEPLOYMENT
    $deployChoice = Confirm-Deploy

    if ($deployChoice -eq "1") {
        # SELECT COMMIT TYPE
        $commitType = Select-CommitType

        # ENTER COMMIT MESSAGE
        $msg = Read-Host "Enter commit message"

        # COMMIT AND DEPLOY
        Commit-And-Deploy -commitType $commitType -msg $msg
    } elseif ($deployChoice -eq "2") {
        Write-Host "[INFO] Operation canceled." -ForegroundColor Red
    } else {
        Write-Host "[ERROR] Invalid choice. Operation canceled." -ForegroundColor Red
    }
}

# CALL MAIN
Main
