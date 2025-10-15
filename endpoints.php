<?php

use App\Http\Controllers\FichaFuncional\Dependentes\ServidorDependenteController;
use App\Http\Controllers\FichaFuncional\Formacao\FormacaoClasseController;
use App\Http\Controllers\FichaFuncional\Formacao\FormacaoCursoController;
use App\Http\Controllers\FichaFuncional\Formacao\ServidorFormacaoController;
use App\Http\Controllers\PromocoesFuncionaisController;
use App\Http\Controllers\FichaFuncional\Dados\ServidorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;
use App\Http\Middleware\AuthenticateExternalJwt;
use App\Http\Controllers\FichaFuncional\Formacao\FormacaoAreaController; //Namespace FormacaoAreaController

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

URL::forceScheme(env('HTTP_SCHEMA'));
URL::forceRootUrl(env('APP_URL'));

/*
 * Rota p  blica de login (JWT) - N ^cO requer autentica    o
 * Aponta para ServidorController@login
 */
Route::post('/login', [ServidorController::class, 'login'])->name('api.login');

/*
 * Rotas protegidas por JWT (guard 'api' -> driver jwt)
 */
Route::middleware([\App\Http\Middleware\AuthenticateExternalJwt::class])->group(function () {

    // Servidor: endpoints protegidos
    Route::post('/servidor/check-senha-assinatura', [ServidorController::class, 'checkSenhaAssinatura']);
    Route::put('/servidor/editar', [ServidorController::class, 'update'])->name('servidor.editar');
    Route::get('/info_pessoal/{matricula}', [ServidorController::class, 'edit'])->name('info_pessoal');

    // Dependentes
    Route::get('/servidor_dependentes_ativos/{servidor_matricula}', [ServidorDependenteController::class, 'index'])
        ->name('servidor_dependentes_ativos');
    Route::get('/servidor_dependentes_inativos/{servidor_matricula}', [ServidorDependenteController::class, 'show'])
        ->name('servidor_dependentes_inativos');
    Route::post('/servidor_dependentes_store/{servidor_matricula}', [ServidorDependenteController::class, 'store'])
        ->name('servidor_dependentes_store');
    Route::post('/servidor_dependentes_update/{id_dependente}', [ServidorDependenteController::class, 'update'])
        ->name('servidor_dependentes_update');
    Route::post('/servidor_dependentes_inativar/{id_dependente}/{servidor_matricula}', [ServidorDependenteController::class, 'destroy'])
        ->name('servidor_dependentes_inativar');
    Route::post('/servidor_dependentes_reativar/{id_dependente}/{servidor_matricula}', [ServidorDependenteController::class, 'reativarDependente'])
        ->name('servidor_dependentes_reativar');

     //Rota para buscar URL do documento
    Route::get('/servidor_dependentes_documento/{id_dependente}', [ServidorDependenteController::class, 'getDocumentoUrl'])
        ->name('servidor_dependentes_documento');

    // Forma    o Acad  mica
    Route::get('/formacao_areas', [FormacaoAreaController::class, 'getAreas'])
        ->name('formacao_areas'); //Rota para buscar Areas

    Route::get('/formacao_classe_area/{area_id}', [FormacaoClasseController::class, 'getClassesByArea'])
        ->name('formacao_classe_area');
    Route::get('/formacao_curso_classe/{classe_id}', [FormacaoCursoController::class, 'getCursosByClasse'])
        ->name('formacao_curso_classe');
    Route::get('/formacao_servidor_list/{servidor_matricula}', [ServidorFormacaoController::class, 'index'])
        ->name('formacao_servidor_list');
    Route::post('/formacao_servidor_store/{servidor_matricula}', [ServidorFormacaoController::class, 'store'])
        ->name('formacao_servidor_store');
    Route::put('/formacao_servidor_update/{servidorFormacao}', [ServidorFormacaoController::class, 'update'])
        ->name('formacao_servidor_update');
    Route::get('/formacao_servidor_edit/{id}', [ServidorFormacaoController::class, 'edit'])
        ->name('formacao_servidor_edit');

    //Rotas para buscar URL dos anexos
    Route::get('/formacao_anexo_frente/{id}', [ServidorFormacaoController::class, 'getAnexoFrenteUrl']);
    Route::get('/formacao_anexo_verso/{id}', [ServidorFormacaoController::class, 'getAnexoVersoUrl']);
});
